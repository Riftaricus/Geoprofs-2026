from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()


class Register_Serializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            password=validated_data["password"],
        )


class Login_Serializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)