from django.db import models

class Leave(models.Model):
    class LeaveStatus(models.TextChoices):
        PENDING = "pending"
        ACCEPTED = "accepted"
        DENIED = "denied"

    #user = models.ForeignKey()

    start_date = models.DateField()
    end_date = models.DateField()

    reason = models.CharField(max_length=100)

    status = models.CharField(
        choices=LeaveStatus.choices,
        default=LeaveStatus.PENDING
    )

    comment = models.CharField(max_length=100, null=True, blank=True)