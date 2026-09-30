from rest_framework import serializers
from api_geoprofs.models.notification import Notification

class Notification_Serializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Notification
        fields = ["title", "description", "timestamp"]