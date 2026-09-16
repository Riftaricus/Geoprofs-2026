from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from core.serializers import Audit_Log_Serializer, Audit_Log

@api_view(["GET"])
def audit_logs(request):
    if request.method == "GET":
        logs = Audit_Log.objects.all()
        serializer = Audit_Log_Serializer(logs, many=True)

        return Response(serializer.data)