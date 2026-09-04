from django.db import models


class Status(models.Model):
    healthy = models.BooleanField(default=True)

    def __str__(self):
        return str(self.healthy)