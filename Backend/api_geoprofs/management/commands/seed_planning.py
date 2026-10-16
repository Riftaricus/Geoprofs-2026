from datetime import datetime, time, timedelta

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from api_geoprofs.models.leave import Leave
from api_geoprofs.models.planning_item import PlanningItem


User = get_user_model()


class Command(BaseCommand):
    help = "Create test users and seed planning items and leave requests."

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write("Testgebruikers controleren...")

        users = self.seed_users()
        today = timezone.localdate()

        #verwijder eerdere seeddata, zodat de seeder opnieuw
        #uitgevoerd kan worden zonder dubbele planningitems
        PlanningItem.objects.filter(
            title__startswith="[SEED]"
        ).delete()

        Leave.objects.filter(
            reason__startswith="[SEED]"
        ).delete()

        for user in users:
            self.stdout.write(
                f"Planning aanmaken voor {user}..."
            )

            self.seed_work_items(user, today)
            self.seed_leave_items(user, today)

        self.stdout.write(self.style.SUCCESS(f"Seeder succesvol uitgevoerd voor {len(users)} gebruikers."))

    def seed_users(self):
        """
        Maak drie testgebruikers aan als ze nog niet bestaan.
        Bestaande gebruikers worden behouden.
        """
        test_users = [
            {
                "username": "seed_user1",
                "email": "seed_user1@example.com",
                "password": "TestPassword123!",
            },
            {
                "username": "seed_user2",
                "email": "seed_user2@example.com",
                "password": "TestPassword123!",
            },
            {
                "username": "seed_user3",
                "email": "seed_user3@example.com",
                "password": "TestPassword123!",
            },
        ]

        users = []

        for data in test_users:
            user, created = User.objects.get_or_create(
                username=data["username"],
                defaults={
                    "email": data["email"],
                },
            )

            if created:
                user.set_password(data["password"])
                user.save()

                self.stdout.write(self.style.SUCCESS(f"Gebruiker aangemaakt: {user.username}"))
            else:
                self.stdout.write(f"Gebruiker bestaat al: {user.username}")

            users.append(user)

        return users

    def make_datetime(self, date, hour, minute=0):
        """
        Maak een timezone-aware datetime voor een bepaalde datum en tijd.
        """
        value = datetime.combine(date, time(hour, minute))

        if timezone.is_naive(value):
            value = timezone.make_aware(value)

        return value

    def seed_work_items(self, user, today):
        """
        Maak werkmomenten en lunchpauzes aan voor de komende werkdagen.
        """
        created = 0

        for offset in range(7):
            date = today + timedelta(days=offset)

            #geen planning aanmaken voor zaterdag en zondag.
            if date.weekday() >= 5:
                continue

            #werkdag: 09:00 - 17:00.
            PlanningItem.objects.create(
                user=user,
                title="[SEED] Werkdag",
                item_type=PlanningItem.ItemType.WORK,
                time_start=self.make_datetime(date, 9),
                time_end=self.make_datetime(date, 17),
            )

            #ik heb break maar toegevoegd alleen ja... we werken met dagen 
            PlanningItem.objects.create(
                user=user,
                title="[SEED] Lunchpauze",
                item_type=PlanningItem.ItemType.BREAK,
                time_start=self.make_datetime(date, 12),
                time_end=self.make_datetime(date, 12, 30),
            )

            created += 2

        self.stdout.write(f"  {created} werk- en pauzemomenten aangemaakt.")

    def seed_leave_items(self, user, today):
        """
        Maak verlofaanvragen met pending, accepted en denied status.
        """
        examples = [
            {
                "offset": 7,
                "duration": 1,
                "status": Leave.LeaveStatus.PENDING,
                "reason": "[SEED] Privéafspraak",
                "title": "[SEED] Verlofaanvraag",
            },
            {
                "offset": 14,
                "duration": 2,
                "status": Leave.LeaveStatus.ACCEPTED,
                "reason": "[SEED] Vakantie",
                "title": "[SEED] Goedgekeurd verlof",
            },
            {
                "offset": 21,
                "duration": 1,
                "status": Leave.LeaveStatus.DENIED,
                "reason": "[SEED] Persoonlijke reden",
                "title": "[SEED] Afgewezen verlof",
            },
        ]

        for example in examples:
            start_date = today + timedelta(
                days=example["offset"]
            )

            end_date = start_date + timedelta(
                days=example["duration"] - 1
            )

            leave = Leave.objects.create(
                user=user,
                start_date=start_date,
                end_date=end_date,
                reason=example["reason"],
                status=example["status"],
                comment="Aangemaakt door de planning-seeder.",
            )

            #maak een PlanningItem aan voor elke verlofdag.
            current_date = start_date

            while current_date <= end_date:
                PlanningItem.objects.create(
                    user=user,
                    title=example["title"],
                    item_type=PlanningItem.ItemType.LEAVE,
                    time_start=self.make_datetime(
                        current_date, 0
                    ),
                    time_end=self.make_datetime(
                        current_date + timedelta(days=1), 0
                    ),
                    leave=leave,
                )

                current_date += timedelta(days=1)

        self.stdout.write("  3 verlofaanvragen aangemaakt.")
