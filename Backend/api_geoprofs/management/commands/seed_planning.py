from datetime import timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from api_geoprofs.models.planning_item import PlanningItem


User = get_user_model()


class Command(BaseCommand):
    help = "Seeds the database with planning items."

    def handle(self, *args, **options):
        user = User.objects.first()

        if not user:
            self.stdout.write(
                self.style.ERROR(
                    "Geen gebruiker gevonden. Maak eerst een gebruiker aan."
                )
            )
            return

        now = timezone.now()

        today = now.replace(
            hour=0,
            minute=0,
            second=0,
            microsecond=0,
        )

        tomorrow = today + timedelta(days=1)

        planning_items = [
            {
                "title": "Werk aan project Geoprofs",
                "time_start": today.replace(hour=8),
                "time_end": today.replace(hour=12),
                "item_type": PlanningItem.ItemType.WORK,
            },
            {
                "title": "Lunchpauze",
                "time_start": today.replace(hour=12),
                "time_end": today.replace(hour=13),
                "item_type": PlanningItem.ItemType.BREAK,
            },
            {
                "title": "Werk aan administratie",
                "time_start": today.replace(hour=13),
                "time_end": today.replace(hour=17),
                "item_type": PlanningItem.ItemType.WORK,
            },
            {
                "title": "Vrije dag",
                "time_start": tomorrow,
                "time_end": tomorrow + timedelta(days=1),
                "item_type": PlanningItem.ItemType.LEAVE,
            },
        ]

        created = 0

        for item in planning_items:
            _, was_created = PlanningItem.objects.get_or_create(
                user=user,
                title=item["title"],
                time_start=item["time_start"],
                defaults={
                    "time_end": item["time_end"],
                    "item_type": item["item_type"],
                },
            )

            if was_created:
                created += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"{created} planning items aangemaakt voor gebruiker "
                f"'{user.username}'."
            )
        )
