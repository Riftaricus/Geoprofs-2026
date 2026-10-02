from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=20)
    adress = models.CharField(max_length=45)
    post_code = models.CharField(max_length=45)
    birth_date = models.DateField()
    country = models.CharField(max_length=45)
    city = models.CharField(max_length=45)
    province = models.CharField(max_length=45, null=True)
    bsn = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)