import io
import posixpath
import re
import zipfile
from pathlib import PurePosixPath
from xml.etree import ElementTree


MAIN_NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
DOC_REL_NS = (
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
)
PACKAGE_REL_NS = (
    "http://schemas.openxmlformats.org/package/2006/relationships"
)

MAX_XLSX_BYTES = 10 * 1024 * 1024
MAX_UNCOMPRESSED_BYTES = 80 * 1024 * 1024
MAX_ARCHIVE_ENTRIES = 500
MAX_ROWS = 5000
MAX_COLUMNS = 200


class XlsxReadError(ValueError):
    pass


def _xml(zip_file, member):
    try:
        content = zip_file.read(member)
    except KeyError as exc:
        raise XlsxReadError(
            f"ساختار فایل Excel ناقص است: {member}"
        ) from exc

    try:
        return ElementTree.fromstring(content)
    except ElementTree.ParseError as exc:
        raise XlsxReadError("XML فایل Excel معتبر نیست.") from exc


def _safe_archive(data):
    if not data or len(data) > MAX_XLSX_BYTES:
        raise XlsxReadError("حجم فایل Excel معتبر نیست یا بیش از حد مجاز است.")

    try:
        archive = zipfile.ZipFile(io.BytesIO(data))
    except zipfile.BadZipFile as exc:
        raise XlsxReadError("فایل انتخاب‌شده XLSX معتبر نیست.") from exc

    members = archive.infolist()

    if len(members) > MAX_ARCHIVE_ENTRIES:
        archive.close()
        raise XlsxReadError("تعداد فایل‌های داخلی Excel بیش از حد مجاز است.")

    total_size = 0

    for member in members:
        path = PurePosixPath(member.filename)

        if path.is_absolute() or ".." in path.parts:
            archive.close()
            raise XlsxReadError("مسیر داخلی نامعتبر در فایل Excel وجود دارد.")

        total_size += member.file_size

        if total_size > MAX_UNCOMPRESSED_BYTES:
            archive.close()
            raise XlsxReadError("فایل Excel پس از بازشدن بیش از حد بزرگ است.")

    return archive


def _shared_strings(archive):
    if "xl/sharedStrings.xml" not in archive.namelist():
        return []

    root = _xml(archive, "xl/sharedStrings.xml")
    values = []

    for item in root.findall(f"{{{MAIN_NS}}}si"):
        texts = item.iterfind(f".//{{{MAIN_NS}}}t")
        values.append("".join(node.text or "" for node in texts))

    return values


def _first_sheet_path(archive):
    workbook = _xml(archive, "xl/workbook.xml")
    sheet = workbook.find(f".//{{{MAIN_NS}}}sheet")

    if sheet is None:
        raise XlsxReadError("فایل Excel هیچ Sheet قابل خواندنی ندارد.")

    relation_id = sheet.attrib.get(f"{{{DOC_REL_NS}}}id")

    if not relation_id:
        raise XlsxReadError("ارتباط Sheet در فایل Excel پیدا نشد.")

    relationships = _xml(archive, "xl/_rels/workbook.xml.rels")

    for relation in relationships.findall(
        f"{{{PACKAGE_REL_NS}}}Relationship"
    ):
        if relation.attrib.get("Id") != relation_id:
            continue

        target = relation.attrib.get("Target", "")

        if target.startswith("/"):
            return target.lstrip("/")

        return posixpath.normpath(posixpath.join("xl", target))

    raise XlsxReadError("مسیر Sheet در فایل Excel پیدا نشد.")


def _column_index(reference):
    match = re.match(r"([A-Z]+)", reference or "")

    if not match:
        raise XlsxReadError("آدرس یک سلول Excel معتبر نیست.")

    result = 0

    for character in match.group(1):
        result = result * 26 + ord(character) - ord("A") + 1

    return result - 1


def _cell_value(cell, shared_strings):
    cell_type = cell.attrib.get("t", "")

    if cell_type == "inlineStr":
        texts = cell.iterfind(f".//{{{MAIN_NS}}}t")
        return "".join(node.text or "" for node in texts)

    value_node = cell.find(f"{{{MAIN_NS}}}v")

    if value_node is None or value_node.text is None:
        return ""

    value = value_node.text

    if cell_type == "s":
        try:
            return shared_strings[int(value)]
        except (ValueError, IndexError) as exc:
            raise XlsxReadError("Shared string نامعتبر در Excel وجود دارد.") from exc

    if cell_type == "b":
        return "1" if value == "1" else "0"

    return value


def read_first_sheet(data):
    """Read raw values from the first sheet of a controlled XLSX export."""

    with _safe_archive(data) as archive:
        shared_strings = _shared_strings(archive)
        sheet_path = _first_sheet_path(archive)
        sheet = _xml(archive, sheet_path)
        rows = []

        for row_node in sheet.findall(f".//{{{MAIN_NS}}}row"):
            if len(rows) >= MAX_ROWS:
                raise XlsxReadError("تعداد ردیف‌های Excel بیش از حد مجاز است.")

            values = []

            for cell in row_node.findall(f"{{{MAIN_NS}}}c"):
                index = _column_index(cell.attrib.get("r", ""))

                if index >= MAX_COLUMNS:
                    raise XlsxReadError(
                        "تعداد ستون‌های Excel بیش از حد مجاز است."
                    )

                if len(values) <= index:
                    values.extend([""] * (index + 1 - len(values)))

                values[index] = _cell_value(cell, shared_strings)

            rows.append(values)

    return rows
