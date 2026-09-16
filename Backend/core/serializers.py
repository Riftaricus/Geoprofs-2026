from core.models import Audit_Log
from rest_framework import serializers

class Audit_Log_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Audit_Log
        fields = ["comment", "timestamp", "log_type"]