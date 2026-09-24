import secrets
from datetime import timedelta

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password, make_password
from django.db import transaction
from django.db.models import Count, Prefetch, Q
from django.utils import timezone

from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.settings import api_settings as jwt_api_settings
from rest_framework_simplejwt.tokens import RefreshToken

from .authentication import StudentJWTAuthentication
from .importing.service import build_import_plan, commit_import_plan
from .models import (
    AcademicYear,
    Classroom,
    Enrollment,
    GradeLevel,
    OtpChallenge,
    Student,
)
from .serializers import (
    AcademicYearSerializer,
    ClassroomSerializer,
    EnrollmentSerializer,
    GradeLevelSerializer,
    OtpRequestSerializer,
    OtpVerifySerializer,
    StudentPortalSerializer,
    StudentSerializer,
)
from .sms import send_student_otp


User = get_user_model()


def client_ip(request):
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")

    if forwarded:
        return forwarded.split(",", 1)[0].strip()

    return request.META.get("REMOTE_ADDR") or None


def issue_student_tokens(student):
    refresh = RefreshToken.for_user(student.user)
    refresh["portal"] = "student"
    refresh["student_id"] = student.pk
    return {
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }


class AcademicYearViewSet(viewsets.ModelViewSet):
    queryset = AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer
    permission_classes = [permissions.IsAdminUser]


class GradeLevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GradeLevel.objects.all()
    serializer_class = GradeLevelSerializer
    permission_classes = [permissions.IsAdminUser]


class ClassroomViewSet(viewsets.ModelViewSet):
    serializer_class = ClassroomSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        queryset = (
            Classroom.objects
            .select_related("academic_year", "grade")
            .annotate(
                active_student_count=Count(
                    "enrollments",
                    filter=Q(
                        enrollments__status=Enrollment.Status.ACTIVE
                    ),
                )
            )
        )
        year = self.request.query_params.get("academic_year")
        grade = self.request.query_params.get("grade")

        if year:
            queryset = queryset.filter(academic_year_id=year)

        if grade:
            queryset = queryset.filter(grade_id=grade)

        return queryset


class StudentViewSet(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        enrollment_queryset = (
            Enrollment.objects
            .select_related("academic_year", "grade", "classroom")
        )
        queryset = (
            Student.objects
            .select_related("user")
            .prefetch_related(
                "guardians",
                Prefetch("enrollments", queryset=enrollment_queryset),
            )
        )
        search = self.request.query_params.get("search", "").strip()
        academic_year = self.request.query_params.get("academic_year")
        grade = self.request.query_params.get("grade")
        classroom = self.request.query_params.get("classroom")
        portal = self.request.query_params.get("portal")

        if search:
            queryset = queryset.filter(
                Q(national_code__icontains=search)
                | Q(first_name__icontains=search)
                | Q(last_name__icontains=search)
                | Q(primary_mobile__icontains=search)
                | Q(sms_mobile__icontains=search)
            )

        if academic_year:
            queryset = queryset.filter(
                enrollments__academic_year_id=academic_year
            )

        if grade:
            queryset = queryset.filter(enrollments__grade_id=grade)

        if classroom:
            queryset = queryset.filter(
                enrollments__classroom_id=classroom
            )

        if portal in {"true", "false"}:
            queryset = queryset.filter(portal_enabled=portal == "true")

        return queryset.distinct()

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.portal_enabled = False
        instance.save(
            update_fields=["is_active", "portal_enabled", "updated_at"]
        )

    @action(detail=True, methods=["post"], url_path="portal-access")
    def portal_access(self, request, pk=None):
        student = self.get_object()
        raw_enabled = request.data.get("enabled", False)
        enabled = (
            raw_enabled
            if isinstance(raw_enabled, bool)
            else str(raw_enabled).strip().lower() in {"1", "true", "yes"}
        )

        if enabled and not student.sms_mobile:
            return Response(
                {"detail": "ابتدا شماره پیامک دانش‌آموز را ثبت کنید."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        student.portal_enabled = enabled
        student.save(update_fields=["portal_enabled", "updated_at"])
        return Response(self.get_serializer(student).data)


class EnrollmentViewSet(viewsets.ModelViewSet):
    serializer_class = EnrollmentSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        queryset = (
            Enrollment.objects
            .select_related(
                "student",
                "academic_year",
                "grade",
                "classroom",
            )
        )
        academic_year = self.request.query_params.get("academic_year")
        grade = self.request.query_params.get("grade")
        classroom = self.request.query_params.get("classroom")

        if academic_year:
            queryset = queryset.filter(academic_year_id=academic_year)

        if grade:
            queryset = queryset.filter(grade_id=grade)

        if classroom:
            queryset = queryset.filter(classroom_id=classroom)

        return queryset


class StudentImportView(APIView):
    permission_classes = [permissions.IsAdminUser]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        files = request.FILES.getlist("files")
        academic_year_id = request.data.get("academic_year")
        should_commit = str(request.data.get("commit", "false")).lower() in {
            "1",
            "true",
            "yes",
        }

        if not files:
            return Response(
                {"detail": "حداقل یک فایل XLSX انتخاب کنید."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if len(files) > 20:
            return Response(
                {"detail": "حداکثر ۲۰ فایل را هم‌زمان انتخاب کنید."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if any(not item.name.lower().endswith(".xlsx") for item in files):
            return Response(
                {"detail": "فقط فایل XLSX پذیرفته می‌شود."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            academic_year = AcademicYear.objects.get(pk=academic_year_id)
        except (AcademicYear.DoesNotExist, TypeError, ValueError):
            return Response(
                {"detail": "سال تحصیلی معتبر انتخاب کنید."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        plan = build_import_plan(files)
        report = plan.report()

        if not should_commit:
            return Response(report)

        if not report["ready_to_commit"]:
            return Response(
                report,
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            committed_report = commit_import_plan(
                plan=plan,
                academic_year=academic_year,
                created_by=request.user,
            )
        except ValueError as exc:
            return Response(
                {**report, "detail": str(exc)},
                status=status.HTTP_409_CONFLICT,
            )

        return Response(
            committed_report,
            status=status.HTTP_201_CREATED,
        )


class StudentOtpRequestView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "student_otp_request"

    generic_response = {
        "detail": (
            "اگر حساب فعال و شماره تأییدشده‌ای وجود داشته باشد، "
            "کد ورود ارسال می‌شود."
        )
    }

    def post(self, request):
        serializer = OtpRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        national_code = serializer.validated_data["national_code"]
        student = (
            Student.objects
            .select_related("user")
            .filter(national_code=national_code)
            .first()
        )

        if not student or not student.can_use_portal:
            return Response(self.generic_response)

        cooldown = timezone.now() - timedelta(
            seconds=settings.STUDENT_OTP_COOLDOWN_SECONDS
        )
        recent_exists = student.otp_challenges.filter(
            created_at__gte=cooldown
        ).exists()

        if recent_exists:
            return Response(self.generic_response)

        code = f"{secrets.randbelow(1_000_000):06d}"
        challenge = OtpChallenge.objects.create(
            student=student,
            mobile=student.sms_mobile,
            code_hash=make_password(code),
            expires_at=(
                timezone.now()
                + timedelta(seconds=settings.STUDENT_OTP_TTL_SECONDS)
            ),
            max_attempts=settings.STUDENT_OTP_MAX_ATTEMPTS,
            request_ip=client_ip(request),
        )

        try:
            send_student_otp(
                student=student,
                mobile=student.sms_mobile,
                code=code,
            )
        except Exception:
            challenge.delete()

        return Response(self.generic_response)


class StudentOtpVerifyView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "student_otp_verify"

    @transaction.atomic
    def post(self, request):
        serializer = OtpVerifySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        student = (
            Student.objects
            .select_related("user")
            .filter(
                national_code=serializer.validated_data["national_code"]
            )
            .first()
        )

        if not student or not student.can_use_portal:
            return self.invalid_code_response()

        challenge = (
            OtpChallenge.objects
            .select_for_update()
            .filter(student=student)
            .first()
        )

        if (
            not challenge
            or not challenge.is_usable
            or challenge.mobile != student.sms_mobile
        ):
            return self.invalid_code_response()

        challenge.attempt_count += 1
        challenge.save(update_fields=["attempt_count"])

        if not check_password(
            serializer.validated_data["code"],
            challenge.code_hash,
        ):
            return self.invalid_code_response()

        now = timezone.now()
        challenge.consumed_at = now
        challenge.save(update_fields=["consumed_at"])

        if student.sms_mobile_verified_at is None:
            student.sms_mobile_verified_at = now
            student.save(
                update_fields=["sms_mobile_verified_at", "updated_at"]
            )

        return Response(
            {
                **issue_student_tokens(student),
                "student": StudentPortalSerializer(student).data,
            }
        )

    @staticmethod
    def invalid_code_response():
        return Response(
            {"detail": "کد ورود نامعتبر یا منقضی شده است."},
            status=status.HTTP_400_BAD_REQUEST,
        )


class StudentTokenRefreshView(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = "student_token_refresh"

    def post(self, request):
        raw_refresh = request.data.get("refresh", "")

        try:
            old_refresh = RefreshToken(raw_refresh)
        except TokenError:
            return Response(
                {"detail": "نشست نامعتبر یا منقضی شده است."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        if old_refresh.get("portal") != "student":
            return Response(
                {"detail": "توکن پرتال دانش‌آموزی معتبر نیست."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user_id = old_refresh.get(jwt_api_settings.USER_ID_CLAIM)
        student = (
            Student.objects
            .select_related("user")
            .filter(
                user__id=user_id,
                user__is_active=True,
                is_active=True,
                portal_enabled=True,
            )
            .first()
        )

        if not student or not student.can_use_portal:
            return Response(
                {"detail": "دسترسی پرتال غیرفعال است."},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            old_refresh.blacklist()
        except AttributeError:
            pass

        return Response(issue_student_tokens(student))


class StudentPortalMeView(APIView):
    authentication_classes = [StudentJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        student = (
            Student.objects
            .prefetch_related("enrollments")
            .get(user=request.user)
        )
        return Response(StudentPortalSerializer(student).data)


class StudentPortalLogoutView(APIView):
    authentication_classes = [StudentJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh = RefreshToken(request.data.get("refresh", ""))

            if refresh.get("portal") != "student":
                raise TokenError()

            if (
                refresh.get(jwt_api_settings.USER_ID_CLAIM)
                != getattr(request.user, jwt_api_settings.USER_ID_FIELD)
            ):
                raise TokenError()

            refresh.blacklist()
        except TokenError:
            return Response(
                {"detail": "توکن خروج معتبر نیست."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(status=status.HTTP_204_NO_CONTENT)
