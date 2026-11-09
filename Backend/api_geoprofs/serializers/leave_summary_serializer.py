from rest_framework import serializers

class LeaveSummarySerializer(serializers.Serializer):
    total_balance = serializers.IntegerField()
    used_balance = serializers.IntegerField()
    remaining = serializers.IntegerField()
    reserved = serializers.IntegerField()
    available = serializers.IntegerField()
