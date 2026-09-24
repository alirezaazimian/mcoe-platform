import re

from django.core.exceptions import ValidationError


PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹"
ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩"


def ascii_digits(value):
    text = str(value or "")
    translations = str.maketrans(
        PERSIAN_DIGITS + ARABIC_DIGITS,
        "0123456789" * 2,
    )
    return text.translate(translations)


def digits_only(value):
    return re.sub(r"\D", "", ascii_digits(value))


def normalize_national_code(value):
    digits = digits_only(value)

    if not digits:
        return ""

    if len(digits) < 10:
        digits = digits.zfill(10)

    return digits


def is_valid_national_code(value):
    code = normalize_national_code(value)

    if not re.fullmatch(r"\d{10}", code):
        return False

    if len(set(code)) == 1:
        return False

    checksum = int(code[-1])
    total = sum(
        int(digit) * (10 - index)
        for index, digit in enumerate(code[:9])
    )
    remainder = total % 11
    expected = remainder if remainder < 2 else 11 - remainder
    return checksum == expected


def validate_national_code(value):
    if not is_valid_national_code(value):
        raise ValidationError("کد ملی معتبر نیست.")


def normalize_mobile(value):
    digits = digits_only(value)

    if len(digits) == 12 and digits.startswith("98"):
        digits = f"0{digits[2:]}"
    elif len(digits) == 10 and digits.startswith("9"):
        digits = f"0{digits}"

    return digits


def is_valid_mobile(value):
    return bool(re.fullmatch(r"09\d{9}", normalize_mobile(value)))


def validate_mobile(value):
    if value and not is_valid_mobile(value):
        raise ValidationError("شماره موبایل معتبر نیست.")


def mask_national_code(value):
    code = normalize_national_code(value)
    return f"******{code[-4:]}" if code else ""


def mask_mobile(value):
    mobile = normalize_mobile(value)

    if len(mobile) != 11:
        return ""

    return f"{mobile[:4]}***{mobile[-4:]}"
