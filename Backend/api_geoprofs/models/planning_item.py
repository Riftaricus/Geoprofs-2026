from django.contrib.auth import get_user_model
from django.db import models

from api_geoprofs.models.leave import Leave


User = get_user_model()


class PlanningItem(models.Model):
    class ItemType(models.TextChoices):
        WORK = "work", "Work"
        BREAK = "break", "Break"
        LEAVE = "leave", "Leave"

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    time_start = models.DateTimeField()
    time_end = models.DateTimeField()
    item_type = models.CharField(max_length=45, choices=ItemType.choices)
    leave = models.ForeignKey(
        Leave,
        null=True,
        on_delete=models.SET_NULL,
    )
