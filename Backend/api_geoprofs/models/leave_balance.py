from django.db import models

class LeaveBalance(models.Model):
    total_balance = models.models.IntegerField()
    used_balance = models.models.IntegerField()

    #User Id Integration here