from django.db import models

class UserData(models.Model):
    # id = models.ForeignKey(to='Account.id', on_delete=models.CASCADE)
    fullName = models.CharField(max_length=100)
    phoneNumber = models.CharField(max_length=20)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)