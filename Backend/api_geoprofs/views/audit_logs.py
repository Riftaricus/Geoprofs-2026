from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api_geoprofs.models import AuditLog
from api_geoprofs.permissions import role_permission_required
from api_geoprofs.serializers import AuditLogSerializer


@role_permission_required("audit_logs.read")
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def audit_logs(request):
    if request.method == "GET":
        logs = AuditLog.objects.all()
        serializer = AuditLogSerializer(logs, many=True)

        return Response(serializer.data)
