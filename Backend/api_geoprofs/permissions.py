from rest_framework.permissions import BasePermission

from api_geoprofs.models import UserRole


class HasRolePermission(BasePermission):
    def has_permission(self, request, view):
        required_permission = getattr(view, "required_role_permission", None)
        if isinstance(required_permission, dict):
            required_permission = required_permission.get(request.method.upper())
        if not required_permission or not request.user.is_authenticated:
            return False

        return UserRole.objects.filter(
            user=request.user,
            role__permissions__action=required_permission,
        ).exists()


def role_permission_required(action):
    if isinstance(action, dict):
        if not action or any(
            not method or not permission
            for method, permission in action.items()
        ):
            raise ValueError("A permission action is required for every HTTP method.")
    elif not action:
        raise ValueError("A permission action is required.")

    def decorator(view):
        view_class = getattr(view, "cls", None)
        if view_class is None:
            raise TypeError("role_permission_required must be used with @api_view")

        view_class.required_role_permission = action
        if HasRolePermission not in view_class.permission_classes:
            view_class.permission_classes = [
                *view_class.permission_classes,
                HasRolePermission,
            ]
        return view

    return decorator
