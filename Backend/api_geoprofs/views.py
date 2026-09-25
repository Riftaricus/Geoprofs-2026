from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from datetime import datetime

from api_geoprofs.models.audit_log import Audit_Log
from api_geoprofs.serializers.audit_log_serializer import Audit_Log_Serializer

from api_geoprofs.models.leave import Leave
from api_geoprofs.serializers.leave_serializer import Leave_Serializer

from api_geoprofs.models.leave_balance import LeaveBalance
from api_geoprofs.serializers.leave_balance_serializer import Leave_Balance_Serializer

@api_view(["GET"])
def audit_logs(request):
    if request.method == "GET":
        logs = Audit_Log.objects.all()
        serializer = Audit_Log_Serializer(logs, many=True)

        return Response(serializer.data)

@api_view(["GET", "POST"])
def leaves(request):
    if request.method == "GET":
        leaves = Leave.objects.all()
        serializer = Leave_Serializer(leaves, many=True)

        return Response(serializer.data)
    if request.method == "POST":
        serializer = Leave_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET", "POST"])
def leave_balances(request):
    if request.method == "GET":
        leaves = LeaveBalance.objects.all()
        serializer = Leave_Balance_Serializer(leaves, many=True)

        return Response(serializer.data)
    if request.method == "POST":
        serializer = Leave_Balance_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(["GET"])
def status(request):
    if request.method == "GET":
        return Response({
            "healthy": True,
            "timestamp": datetime.now()
        })