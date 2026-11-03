from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from api_geoprofs.models import AuditLog, Notification
from api_geoprofs.functions import log, notify
from django.contrib.auth import get_user_model

from api_geoprofs.serializers import RegisterSerializer
from rest_framework.authtoken.models import Token

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

        # self.user.objects.create(password="Test", username="Bob", email="Tro")

        data = {"password": "Testing1234", "email": "tro@gmail.com"}

        serializer = RegisterSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        
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
        token, _ = Token.objects.get_or_create(user=user)

        notify("Test", "This is a test notification", user.id)
        
    def test_notification_exist(self):
        notification = Notification.objects.get(id=1)
        self.assertEqual(notification.title, "Test")
        self.assertEqual(notification.description, "This is a test notification")

        self.assertEqual(notification.user.email, "tro@gmail.com")
        self.assertNotEqual(notification.user.password, "Testing1234")