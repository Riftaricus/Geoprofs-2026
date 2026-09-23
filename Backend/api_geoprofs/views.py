from django.contrib.auth import authenticate
from rest_framework import permissions, status as drf_status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from datetime import datetime

from api_geoprofs.serializers.auth_serializer import Login_Serializer, Register_Serializer
from api_geoprofs.models.audit_log import Audit_Log
from api_geoprofs.serializers.audit_log_serializer import Audit_Log_Serializer

from api_geoprofs.models.leave import Leave
from api_geoprofs.serializers.leave_serializer import Leave_Serializer

from api_geoprofs import functions

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def register(request):
    serializer = Register_Serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    functions.log(f'User {request.user.id} ({request.user.email}) created new account with email: {serializer.validated_data["email"]}')
    
    user = serializer.save()
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key}, status=drf_status.HTTP_201_CREATED)


@api_view(["POST"])
def login(request):
    serializer = Login_Serializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = authenticate(
        username=serializer.validated_data["email"],
        password=serializer.validated_data["password"],
    )
    
    if user is None:
        return Response(
            {"detail": "Invalid email or password."},
            status=drf_status.HTTP_401_UNAUTHORIZED,
        )

    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audit_logs(request):
    if request.method == "GET":
        logs = Audit_Log.objects.all()
        serializer = Audit_Log_Serializer(logs, many=True)

        return Response(serializer.data)

@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def leaves(request):
    if request.method == "GET":
        leaves = Leave.objects.all()
        serializer = Leave_Serializer(leaves, many=True)

        return Response(serializer.data)
    if request.method == "POST":
        serializer = Leave_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=drf_status.HTTP_201_CREATED)
            return Response(serializer.errors, status=drf_status.HTTP_400_BAD_REQUEST)
@api_view(["GET"])
def status(request):
    if request.method == "GET":
        return Response({
            "healthy": True,
            "timestamp": datetime.now()
        })