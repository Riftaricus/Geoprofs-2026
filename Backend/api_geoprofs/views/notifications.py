from rest_framework import permissions
from rest_framework import status as drf_status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api_geoprofs.models import Notification
from api_geoprofs.serializers import NotificationSerializer


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
