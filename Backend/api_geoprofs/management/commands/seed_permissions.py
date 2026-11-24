from django.core.management.base import BaseCommand
from django.db import transaction

from api_geoprofs.models import Permission


PERMISSIONS = (
    ("roles.read", "View roles."),
    ("roles.create", "Create roles."),
    ("roles.update", "Update roles."),
    ("roles.delete", "Delete roles."),
    ("audit_logs.read", "View audit logs."),
)


class Command(BaseCommand):
    help = "Seed the permissions."

    @transaction.atomic
    def handle(self, *args, **options):
        created_count = 0

        for action, description in PERMISSIONS:
            permission, created = Permission.objects.get_or_create(
                action=action,
                defaults={"description": description},
            )
            if created:
                created_count += 1
                self.stdout.write(f"Created permission: {permission.action}")
            else:
                self.stdout.write(f"Permission already exists: {permission.action}")

        existing_count = len(PERMISSIONS) - created_count
        self.stdout.write(
            self.style.SUCCESS(
                f"Permission seeding complete: {created_count} created, "
                f"{existing_count} already existed."
            )
        )