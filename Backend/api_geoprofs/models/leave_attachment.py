import os
import uuid

from django.db import models

from api_geoprofs.models.leave import Leave


def leave_attachment_path(instance, filename: str) -> str:
    """
    Bestanden krijgen een willekeurige naam, zodat de bestandsnaam van de
    gebruiker nooit op de schijf terechtkomt en het pad niet te raden is.
    """
    extension = os.path.splitext(filename)[1].lower()

    return f"leave_attachments/{instance.leave.user_id}/{uuid.uuid4().hex}{extension}"


class LeaveAttachment(models.Model):
    leave = models.ForeignKey(
        Leave,
        on_delete=models.CASCADE,
        related_name="attachments",
    )
    file = models.FileField(upload_to=leave_attachment_path)
    original_name = models.CharField(max_length=255)
    content_type = models.CharField(max_length=100)
    size = models.PositiveIntegerField()
    uploaded_at = models.DateTimeField(auto_now_add=True)
