from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()

class AuditLog(models.Model):
    comment = models.CharField(max_length=100)
    timestamp = models.DateTimeField()
    log_type = models.CharField(max_length=100)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
