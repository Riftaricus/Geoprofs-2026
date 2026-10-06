from rest_framework import serializers
from api_geoprofs.models import Notification

class NotificationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Notification
        fields = ["title", "description", "timestamp"]