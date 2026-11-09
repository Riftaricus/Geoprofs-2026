import os

from django.core.exceptions import ValidationError

from api_geoprofs.models import LeaveAttachment

MAX_FILES = 3
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

#toegestane extensies
CONTENT_TYPES = {
    ".pdf": "application/pdf",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
}

#de eerste bytes van een echt bestand van dat type
SIGNATURES = {
    ".pdf": b"%PDF",
    ".jpg": b"\xff\xd8\xff",
    ".jpeg": b"\xff\xd8\xff",
    ".png": b"\x89PNG\r\n\x1a\n",
}


def get_extension(filename: str) -> str:
    return os.path.splitext(filename)[1].lower()


def validate_attachment(file) -> None:
    """
    Controleert type, grootte en inhoud van één bestand.
    """
    extension = get_extension(file.name)

    if extension not in CONTENT_TYPES:
        raise ValidationError(f"'{file.name}' is geen PDF, JPG of PNG.")

    if file.size > MAX_FILE_SIZE:
        raise ValidationError(f"'{file.name}' is groter dan 10 MB.")

    header = file.read(len(SIGNATURES[extension]))
    file.seek(0)

    if header != SIGNATURES[extension]:
        raise ValidationError(f"'{file.name}' is geen geldig bestand.")


def validate_attachments(files: list) -> None:
    if len(files) > MAX_FILES:
        raise ValidationError(f"Je kunt maximaal {MAX_FILES} bestanden toevoegen.")

    for file in files:
        validate_attachment(file)


def save_attachments(leave, files: list) -> None:
    for file in files:
        LeaveAttachment.objects.create(
            leave=leave,
            file=file,
            original_name=os.path.basename(file.name)[:255],
            content_type=CONTENT_TYPES[get_extension(file.name)],
            size=file.size,
        )
