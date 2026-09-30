from rest_framework import serializers
from api_geoprofs.models import AuditLog

class AuditLogSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AuditLog
        fields = ["comment", "timestamp", "log_type"]