from types import SimpleNamespace

from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory, TestCase
from rest_framework.decorators import api_view

from api_geoprofs.functions import log, notify
from api_geoprofs.models import AuditLog, Notification, Permission, Role, UserRole
from api_geoprofs.permissions import HasRolePermission, role_permission_required
from api_geoprofs.serializers import RegisterSerializer


class AuditLogTestCase(TestCase):
    def setUp(self):
        log("Testlog")
    def test_log_can_read(self):
        log = AuditLog.objects.get(comment="Testlog")
        self.assertEqual(log.comment, "Testlog")

        log.comment = "Test2"
        log.save(update_fields=["comment"])

        self.assertEqual(log.comment, "Test2")

class UserTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model()

        data = {"password": "Testing1234", "email": "tro@gmail.com"}

        serializer = RegisterSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        
    def test_user_exists(self):
        user = self.user.objects.get(username="tro@gmail.com")
        self.assertEqual(user.username, "tro@gmail.com")
        self.assertNotEqual(user.password, "Testing1234")
        self.assertEqual(user.email, "tro@gmail.com")
        self.assertFalse(user.is_superuser)
        self.assertIsNotNone(user.date_joined)
    def tearDown(self):
        self.user.objects.all().delete()

class NotificationTestCase(TestCase):
    def setUp(self):
        self.user = get_user_model()

        data = {"password": "Testing1234", "email": "tro@gmail.com"}

        serializer = RegisterSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()

        notify("Test", "This is a test notification", user.id)
        
    def test_notification_exist(self):
        notification = Notification.objects.get(id=1)
        self.assertEqual(notification.title, "Test")
        self.assertEqual(notification.description, "This is a test notification")

        self.assertEqual(notification.user.email, "tro@gmail.com")
        self.assertNotEqual(notification.user.password, "Testing1234")


class PermissionsTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.user = get_user_model().objects.create_user(
            username="permission-user",
            password="Testing1234",
        )
        self.role = Role.objects.create(role_name="Reader")
        self.permission = Permission.objects.create(action="roles.read")
        self.role.permissions.add(self.permission)
        UserRole.objects.create(user=self.user, role=self.role)

    def test_user_with_required_permission_is_allowed(self):
        request = self.factory.get("/")
        request.user = self.user
        view = SimpleNamespace(required_role_permission="roles.read")

        self.assertTrue(HasRolePermission().has_permission(request, view))

    def test_user_without_required_permission_is_denied(self):
        request = self.factory.get("/")
        request.user = self.user
        view = SimpleNamespace(required_role_permission="roles.update")

        self.assertFalse(HasRolePermission().has_permission(request, view))

    def test_permission_mapping_uses_request_method(self):
        permission = HasRolePermission()
        view = SimpleNamespace(
            required_role_permission={
                "GET": "roles.read",
                "POST": "roles.create",
            }
        )

        get_request = self.factory.get("/")
        get_request.user = self.user
        post_request = self.factory.post("/")
        post_request.user = self.user

        self.assertTrue(permission.has_permission(get_request, view))
        self.assertFalse(permission.has_permission(post_request, view))

    def test_unauthenticated_user_is_denied(self):
        request = self.factory.get("/")
        request.user = AnonymousUser()
        view = SimpleNamespace(required_role_permission="roles.read")

        self.assertFalse(HasRolePermission().has_permission(request, view))
