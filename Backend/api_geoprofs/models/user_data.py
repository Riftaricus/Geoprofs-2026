from django.db import models
from api_geoprofs.models.account import Account

class UserData(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE, default=-1)
    fullName = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)