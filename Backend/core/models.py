from django.db import models

class Audit_Log(models.Model):
    comment = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)
    logType = models.CharField(max_length=100)

class UserData(models.Model):
    # id = models.ForeignKey(to='Account.id', on_delete=models.CASCADE)
    fullName = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
