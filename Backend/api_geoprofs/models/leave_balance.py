from django.db import models

class LeaveBalance(models.Model):
    total_balance = models.IntegerField()
    used_balance = models.IntegerField()

    user = models.ForeignKey(to='account.id', on_delete=models.CASCADE)