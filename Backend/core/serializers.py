from core.models import Audit_Log, Leave
from rest_framework import serializers

class Audit_Log_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Audit_Log
        fields = ["comment", "timestamp", "log_type"]
class Leave_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Leave
        fields = ["user_id", "start_date", "end_date", "reason", "status", "comment"]

    def create(self, validated_data):
        return Leave.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.start_date = validated_data.get("start_date", instance.start_date)
        instance.end_date = validated_data.get("end_date", instance.end_date)
        instance.reason = validated_data.get("reason", instance.reason)
        instance.status = validated_data.get("status", instance.status)
        instance.comment = validated_data.get("comment", instance.comment)
        instance.save()
        return instance