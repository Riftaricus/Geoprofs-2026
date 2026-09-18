from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from core.serializers import Audit_Log_Serializer, Audit_Log, Leave_Serializer, Leave

from datetime import datetime

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
@api_view(["GET"])
def status(request):
    if request.method == "GET":
        return Response({
            "healthy": True,
            "timestamp": datetime.now()
        })