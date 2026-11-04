from django.conf import settings
from django.db import models


class UserRole(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="role_assignment",
    )
    role = models.ForeignKey(
        "api_geoprofs.Role",
        on_delete=models.PROTECT,
        related_name="user_assignments",
    )
