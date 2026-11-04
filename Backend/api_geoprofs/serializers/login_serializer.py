
from django.contrib.auth import get_user_model
from rest_framework import serializers

from api_geoprofs.models import UserData

User = get_user_model()


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
    )


class UserDataSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        source="user.email",
        read_only=True,
    )

    class Meta:
        model = UserData
        fields = [
            "first_name",
            "middle_name",
            "last_name",
            "email",
            "phone_number",
            "adress",
            "post_code",
            "birth_date",
            "country",
            "city",
            "province",
            "created_at",
            "updated_at",
        ]
