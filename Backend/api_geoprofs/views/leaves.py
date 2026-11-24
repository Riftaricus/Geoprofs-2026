from rest_framework import permissions
from rest_framework import status as drf_status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api_geoprofs.models import Leave, LeaveBalance
from api_geoprofs.serializers import (
    LeaveBalanceSerializer,
    LeaveRequestSerializer,
    LeaveSummarySerializer,
)
from api_geoprofs.services.leave_balance import get_leave_summary


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
