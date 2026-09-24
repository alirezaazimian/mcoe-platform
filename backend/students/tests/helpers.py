import io
import zipfile
from xml.sax.saxutils import escape


def valid_national_code(prefix):
    first_nine = str(prefix).zfill(9)[-9:]
    total = sum(
        int(digit) * (10 - index)
        for index, digit in enumerate(first_nine)
    )
    remainder = total % 11
    checksum = remainder if remainder < 2 else 11 - remainder
    return f"{first_nine}{checksum}"


def column_name(index):
    result = ""
    number = index + 1

    while number:
        number, remainder = divmod(number - 1, 26)
        result = chr(ord("A") + remainder) + result

    return result


def xlsx_bytes(rows):
    row_xml = []

    for row_index, row in enumerate(rows, start=1):
        cells = []

        for column_index, value in enumerate(row):
            if value in {None, ""}:
                continue

            reference = f"{column_name(column_index)}{row_index}"
            cells.append(
                f'<c r="{reference}" t="inlineStr"><is><t>'
                f"{escape(str(value))}"
                "</t></is></c>"
            )

        row_xml.append(
            f'<row r="{row_index}">{"".join(cells)}</row>'
        )

    worksheet = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<worksheet xmlns="http://schemas.openxmlformats.org/'
        'spreadsheetml/2006/main">'
        f'<sheetData>{"".join(row_xml)}</sheetData>'
        "</worksheet>"
    )
    workbook = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<workbook xmlns="http://schemas.openxmlformats.org/'
        'spreadsheetml/2006/main" '
        'xmlns:r="http://schemas.openxmlformats.org/'
        'officeDocument/2006/relationships">'
        '<sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/>'
        "</sheets></workbook>"
    )
    relationships = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/'
        'package/2006/relationships">'
        '<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/'
        'relationships/worksheet" Target="worksheets/sheet1.xml"/>'
        "</Relationships>"
    )

    output = io.BytesIO()

    with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED) as archive:
        archive.writestr("xl/workbook.xml", workbook)
        archive.writestr("xl/_rels/workbook.xml.rels", relationships)
        archive.writestr("xl/worksheets/sheet1.xml", worksheet)

    return output.getvalue()
