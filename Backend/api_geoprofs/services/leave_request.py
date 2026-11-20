from datetime import datetime, time, timedelta

from django.db import transaction
from django.utils import timezone

from api_geoprofs import functions
from api_geoprofs.models import Leave, PlanningItem
from api_geoprofs.services.leave_attachments import save_attachments
from api_geoprofs.services.leave_days import iter_workdays

LEAVE_PLANNING_TITLE = "Verlofaanvraag"


def _make_datetime(day, hour: int = 0):
    value = datetime.combine(day, time(hour, 0))

    if timezone.is_naive(value):
        value = timezone.make_aware(value)

    return value


@transaction.atomic
def create_leave_request(user, validated_data: dict) -> Leave:
    """
    Maak een verlofaanvraag aan met status 'pending', bewaar de bijlagen en zet
    elke werkdag in de planning, zodat de aanvraag meteen zichtbaar is.
    """
    leave = Leave.objects.create(
        user=user,
        start_date=validated_data["start_date"],
        end_date=validated_data["end_date"],
        reason=validated_data["reason"],
        comment=validated_data.get("comment") or None,
        status=Leave.LeaveStatus.PENDING,
    )

    save_attachments(leave, validated_data.get("attachments", []))

    for day in iter_workdays(leave.start_date, leave.end_date):
        PlanningItem.objects.create(
            user=user,
            title=LEAVE_PLANNING_TITLE,
            item_type=PlanningItem.ItemType.LEAVE,
            time_start=_make_datetime(day),
            time_end=_make_datetime(day + timedelta(days=1)),
            leave=leave,
        )

    functions.log(f"User {user.id} vroeg verlof aan (#{leave.id})", user.id)
    functions.notify(
        "Verlofaanvraag ingediend",
        f"Je aanvraag van {leave.start_date:%d-%m-%Y} t/m "
        f"{leave.end_date:%d-%m-%Y} is verstuurd.",
        user.id,
    )

    return leave
