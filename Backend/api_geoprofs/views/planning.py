from rest_framework import permissions
from rest_framework import status as drf_status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api_geoprofs.models import PlanningItem
from api_geoprofs.serializers import PlanningItemSerializer


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
