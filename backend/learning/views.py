from django.db.models import Count, F

from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from students.authentication import StudentJWTAuthentication
from students.models import Enrollment

from .models import (
    OnlineSession,
    SessionAttendance,
    Subject,
    Teacher,
    TeachingAssignment,
)
from .providers import ProviderNotConfigured, get_online_class_provider
from .serializers import (
    OnlineSessionSerializer,
    SessionAttendanceSerializer,
    StudentOnlineSessionSerializer,
    SubjectSerializer,
    TeacherSerializer,
    TeachingAssignmentSerializer,
)
from .services import sync_session_roster


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.select_related("user")
    serializer_class = TeacherSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save(update_fields=["is_active", "updated_at"])


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [permissions.IsAdminUser]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save(update_fields=["is_active", "updated_at"])


class TeachingAssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = TeachingAssignmentSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        queryset = TeachingAssignment.objects.select_related(
            "academic_year",
            "classroom",
            "classroom__grade",
            "subject",
            "teacher",
        )
        academic_year = self.request.query_params.get("academic_year")
        classroom = self.request.query_params.get("classroom")
        teacher = self.request.query_params.get("teacher")

        if academic_year:
            queryset = queryset.filter(academic_year_id=academic_year)

        if classroom:
            queryset = queryset.filter(classroom_id=classroom)

        if teacher:
            queryset = queryset.filter(teacher_id=teacher)

        return queryset

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save(update_fields=["is_active", "updated_at"])


class OnlineSessionViewSet(viewsets.ModelViewSet):
    serializer_class = OnlineSessionSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        queryset = (
            OnlineSession.objects
            .select_related(
                "assignment",
                "assignment__academic_year",
                "assignment__classroom",
                "assignment__classroom__grade",
                "assignment__subject",
                "assignment__teacher",
            )
            .annotate(roster_size=Count("attendance_records"))
        )
        classroom = self.request.query_params.get("classroom")
        teacher = self.request.query_params.get("teacher")
        session_status = self.request.query_params.get("status")

        if classroom:
            queryset = queryset.filter(assignment__classroom_id=classroom)

        if teacher:
            queryset = queryset.filter(assignment__teacher_id=teacher)

        if session_status:
            queryset = queryset.filter(status=session_status)

        return queryset

    def perform_create(self, serializer):
        provider = get_online_class_provider()
        session = serializer.save(
            created_by=self.request.user,
            provider_key=provider.key,
        )
        sync_session_roster(session)

    def perform_update(self, serializer):
        session = serializer.save()
        sync_session_roster(session)

    def perform_destroy(self, instance):
        instance.status = OnlineSession.Status.CANCELLED
        instance.save(update_fields=["status", "updated_at"])

    @action(detail=True, methods=["post"], url_path="sync-roster")
    def sync_roster(self, request, pk=None):
        session = self.get_object()
        return Response(sync_session_roster(session))


class SessionAttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = SessionAttendanceSerializer
    permission_classes = [permissions.IsAdminUser]
    http_method_names = ["get", "patch", "head", "options"]

    def get_queryset(self):
        queryset = SessionAttendance.objects.select_related(
            "session",
            "session__assignment",
            "session__assignment__classroom",
            "student",
        )
        session = self.request.query_params.get("session")
        classroom = self.request.query_params.get("classroom")

        if session:
            queryset = queryset.filter(session_id=session)

        if classroom:
            queryset = queryset.filter(
                session__assignment__classroom_id=classroom
            )

        return queryset


def student_session_queryset(user):
    return (
        OnlineSession.objects
        .select_related(
            "assignment",
            "assignment__classroom",
            "assignment__classroom__grade",
            "assignment__subject",
            "assignment__teacher",
        )
        .filter(
            assignment__classroom__enrollments__student=user.student_profile,
            assignment__classroom__enrollments__status=Enrollment.Status.ACTIVE,
            assignment__classroom__enrollments__academic_year=F(
                "assignment__academic_year"
            ),
            assignment__is_active=True,
        )
        .exclude(status=OnlineSession.Status.DRAFT)
        .distinct()
    )


class StudentOnlineSessionListView(APIView):
    authentication_classes = [StudentJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        sessions = student_session_queryset(request.user)
        return Response(StudentOnlineSessionSerializer(sessions, many=True).data)


class StudentOnlineSessionJoinView(APIView):
    authentication_classes = [StudentJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        session = student_session_queryset(request.user).filter(pk=pk).first()

        if not session:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = StudentOnlineSessionSerializer(session)

        if not serializer.data["join_available"]:
            return Response(
                {"detail": serializer.data["join_message"]},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        provider = get_online_class_provider()

        try:
            join_url = provider.join_url(
                session=session,
                participant=request.user.student_profile,
                role="viewer",
            )
        except ProviderNotConfigured:
            return Response(
                {"detail": "سرویس برگزاری کلاس هنوز متصل نشده است."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        return Response({"join_url": join_url})
