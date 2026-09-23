from rest_framework import serializers
from api_geoprofs.models.audit_log import Audit_Log

class Audit_Log_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Audit_Log
        fields = ["comment", "timestamp", "log_type"]