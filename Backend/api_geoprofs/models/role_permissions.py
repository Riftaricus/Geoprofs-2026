from django.db import models


class RolePermissions(models.Model):
    pk = models.CompositePrimaryKey("role_id", "permission_id")
    role = models.ForeignKey("api_geoprofs.Role", on_delete=models.CASCADE)
    permission = models.ForeignKey("api_geoprofs.Permission", on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(auto_now_add=True)
