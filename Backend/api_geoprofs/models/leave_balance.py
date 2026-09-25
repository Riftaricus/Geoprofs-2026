from django.db import models

class LeaveBalance(models.Model):
    total_balance = models.IntegerField()
    used_balance = models.IntegerField()

    #User Id Integration here