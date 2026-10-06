from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class Notification(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    timestamp = models.DateTimeField()

    user = models.ForeignKey(User, on_delete=models.CASCADE)
