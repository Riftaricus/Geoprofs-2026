from rest_framework import serializers
from api_geoprofs.models import UserData

class UserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ["fullName", "phoneNumber", "adress", "created_at", "updated_at"]