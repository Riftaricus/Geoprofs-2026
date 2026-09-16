from django.db import models

class Audit_Log(models.Model):
    comment = models.CharField(max_length=100)
    timestamp = models.DateTimeField()
    # user = models.ForeignKey(User, on_delete=models.CASCADE)