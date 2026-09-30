from django.db import models

class Audit_Log(models.Model):
    comment = models.CharField(max_length=100)
    timestamp = models.DateTimeField()
    log_type = models.CharField(max_length=100)

    user = models.ForeignKey(to='Account.id', on_delete=models.DO_NOTHING)
    timestamp = models.DateTimeField(auto_now_add=True)
    logType = models.CharField(max_length=100)