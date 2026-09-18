from django.db import models

class Audit_Log(models.Model):
    comment = models.CharField(max_length=100)
    timestamp = models.DateTimeField()
    log_type = models.CharField(max_length=100)

    #user = models.ForeignKey()