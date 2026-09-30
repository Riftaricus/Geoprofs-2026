from django.db import models
from api_geoprofs.models.account import Account

class LeaveBalance(models.Model):
    total_balance = models.IntegerField()
    used_balance = models.IntegerField()

    user = models.ForeignKey(Account, on_delete=models.CASCADE, default=-1)