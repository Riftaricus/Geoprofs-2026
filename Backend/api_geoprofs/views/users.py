from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api_geoprofs.models import UserData
from api_geoprofs.serializers import UserDataSerializer


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def user_data(request):
    data = UserData.objects.filter(user=request.user)
    serializer = UserDataSerializer(data, many=True)
    return Response(serializer.data)
