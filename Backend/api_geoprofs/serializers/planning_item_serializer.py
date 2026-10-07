from rest_framework import serializers

from api_geoprofs.models import PlanningItem


class PlanningItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanningItem
        fields = [
            "id",
            "user_id",
            "title",
            "time_start",
            "time_end",
            "item_type",
            "leave_id",
        ]
