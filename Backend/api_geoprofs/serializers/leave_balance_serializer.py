from rest_framework import serializers
from api_geoprofs.models.leave_balance import LeaveBalance

class Leave_Balance_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LeaveBalance
        fields = ["user_id", "total_balance", "used_balance"]

    def create(self, validated_data):
        return LeaveBalance.objects.create(**validated_data)
    def update(self, instance, validated_data):
        instance.start_date = validated_data.get("user_id", instance.user_id)
        instance.end_date = validated_data.get("total_balance", instance.total_balance)
        instance.reason = validated_data.get("used_balance", instance.used_balance)
        instance.save()
        return instance