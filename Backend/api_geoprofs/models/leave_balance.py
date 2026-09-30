from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class LeaveBalance(models.Model):
    total_balance = models.IntegerField()
    used_balance = models.IntegerField()

    user = models.ForeignKey(User, on_delete=models.CASCADE)