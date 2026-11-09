from datetime import datetime

from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from rest_framework import permissions
from rest_framework import status as drf_status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api_geoprofs import functions
from api_geoprofs.models import (
    AuditLog,
    Leave,
    LeaveBalance,
    Notification,
    PlanningItem,
    UserData,
)
from api_geoprofs.permissions import role_permission_required
from api_geoprofs.services.leave_balance import get_leave_summary
from api_geoprofs.serializers import (
    AuditLogSerializer,
    LeaveBalanceSerializer,
    LeaveSerializer,
    LeaveRequestSerializer,
    LeaveSummarySerializer,
    LoginSerializer,
    NotificationSerializer,
    PlanningItemSerializer,
    RegisterSerializer,
    UserDataSerializer,
)

User = get_user_model()

@require_GET
def dev_login(request):
    if not settings.DEBUG:
        return JsonResponse(
            {"error": "Alleen beschikbaar in development."},
            status=403,
        )

    user = User.objects.filter(username="seed_user1").first()

    if user is None:
        return JsonResponse(
            {"error": "Testgebruiker bestaat niet. Voer eerst de seeder uit."},
            status=404,
        )

    login(request, user, backend="django.contrib.auth.backends.ModelBackend")

    return JsonResponse({
        "message": "Development login succesvol",
        "is_authenticated": request.user.is_authenticated,
        "username": user.get_username(),
    })
    
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def user_data(request):
    data = UserData.objects.filter(user=request.user)
    serializer = UserDataSerializer(data, many=True)
    return Response(serializer.data)
    

@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    functions.log(f'User {request.user.id} ({request.user.email}) created new account with email: {serializer.validated_data["email"]}')
    
    user = serializer.save()
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key}, status=drf_status.HTTP_201_CREATED)



@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def login(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data["email"].strip()
    password = serializer.validated_data["password"]

    user = User.objects.filter(email__iexact=email).first()

    if user is None:
        return Response(
            {"detail": "Gebruiker met dit e-mailadres bestaat niet."},
            status=drf_status.HTTP_401_UNAUTHORIZED,
        )

    if not user.check_password(password):
        return Response(
            {"detail": "Het wachtwoord is onjuist."},
            status=drf_status.HTTP_401_UNAUTHORIZED,
        )

    if not user.is_active:
        return Response(
            {"detail": "Dit account is gedeactiveerd."},
            status=drf_status.HTTP_401_UNAUTHORIZED,
        )

    token, _ = Token.objects.get_or_create(user=user)

    return Response({"token": token.key})


@role_permission_required("audit_logs.read")
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audit_logs(request):
    if request.method == "GET":
        logs = AuditLog.objects.all()
        serializer = AuditLogSerializer(logs, many=True)

        return Response(serializer.data)

@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def notifications(request):
    if request.method == "GET":
        notifications = Notification.objects.all().filter(user_id=request.user.id)
        serializer = NotificationSerializer(notifications, many=True)

        return Response(serializer.data)
    if request.method == "POST":
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=drf_status.HTTP_201_CREATED)
        return Response(serializer.errors, status=health.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def leaves(request):
    if request.method == "GET":
        leaves = Leave.objects.filter(user=request.user).order_by("-start_date")
        serializer = LeaveRequestSerializer(leaves, many=True)

        return Response(serializer.data)

    serializer = LeaveRequestSerializer(
        data=request.data,
        context={"request": request},
    )
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data, status=drf_status.HTTP_201_CREATED)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def leave_summary(request):
    serializer = LeaveSummarySerializer(get_leave_summary(request.user))

    return Response(serializer.data)

@api_view(["GET", "POST"])
def leave_balances(request):
    if request.method == "GET":
        leaves = LeaveBalance.objects.all().filter(user_id=request.user.id)
        serializer = LeaveBalanceSerializer(leaves, many=True)

        return Response(serializer.data)
    if request.method == "POST":
        serializer = LeaveBalanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=health.HTTP_201_CREATED)
        return Response(serializer.errors, status=health.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def planning_items(request):
    if request.method == "GET":
        items = PlanningItem.objects.filter(user=request.user)

        print("Ingelogde gebruiker:", request.user.id, request.user.email)
        print("Aantal planningitems:", items.count())

        serializer = PlanningItemSerializer(items, many=True)
        return Response(serializer.data)

    serializer = PlanningItemSerializer(data=request.data, context={"request": request})
    serializer.is_valid(raise_exception=True)
    serializer.save(user=request.user)
    return Response(serializer.data, status=drf_status.HTTP_201_CREATED)
    
@api_view(["GET"])
def health(request):
    if request.method == "GET":
        return Response({
            "healthy": True,
            "timestamp": datetime.now()
        })
        
@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    return Response(status=drf_status.HTTP_204_NO_CONTENT)