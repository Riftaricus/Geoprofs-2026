from django.db import models
from api_geoprofs.models.account import Account

class Audit_Log(models.Model):
    comment = models.CharField(max_length=100)
    timestamp = models.DateTimeField()
    log_type = models.CharField(max_length=100)

    user = models.ForeignKey(Account, on_delete=models.CASCADE, default=-1)
