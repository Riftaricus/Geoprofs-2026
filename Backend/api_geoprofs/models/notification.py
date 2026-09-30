from django.db import models
from api_geoprofs.models.account import Account

class Notification(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    timestamp = models.DateTimeField()

    user = models.ForeignKey(Account, on_delete=models.CASCADE, default=-1)
