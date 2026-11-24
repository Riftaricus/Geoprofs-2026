from django.db.models.deletion import ProtectedError
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework import status as drf_status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from api_geoprofs.models import Role
from api_geoprofs.permissions import role_permission_required
from api_geoprofs.serializers import RoleSerializer


@role_permission_required({
    "GET": "roles.read",
    "POST": "roles.create",
})
@api_view(["GET", "POST"])
@permission_classes([permissions.IsAuthenticated])
def roles(request):
    if request.method == "GET":
        role_list = Role.objects.prefetch_related("permissions").order_by("role_name")
        serializer = RoleSerializer(role_list, many=True)
        return Response(serializer.data)

    serializer = RoleSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=drf_status.HTTP_201_CREATED)


@role_permission_required({
    "GET": "roles.read",
    "PUT": "roles.update",
    "DELETE": "roles.delete",
})
@api_view(["GET", "PUT", "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def role_detail(request, role_id):
    role = get_object_or_404(
        Role.objects.prefetch_related("permissions"),
        pk=role_id,
    )

    if request.method == "GET":
        serializer = RoleSerializer(role)
        return Response(serializer.data)

    if request.method == "PUT":
        serializer = RoleSerializer(
            role,
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    if request.method == "DELETE":
        try:
            role.delete()
        except ProtectedError:
            return Response(
                {"detail": "Cannot delete a role while users are assigned to it."},
                status=drf_status.HTTP_409_CONFLICT,
            )
        return Response(status=drf_status.HTTP_204_NO_CONTENT)

    return Response(status=drf_status.HTTP_405_METHOD_NOT_ALLOWED)
