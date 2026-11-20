from django.db.models import Sum

from api_geoprofs.models import Leave, LeaveBalance
from api_geoprofs.services.leave_days import count_workdays


def get_reserved_days(user) -> int:
    """
    Dagen die al gereserveerd zijn door aanvragen die nog op een besluit wachten.
    """
    pending = Leave.objects.filter(user=user, status=Leave.LeaveStatus.PENDING)

    return sum(
        count_workdays(leave.start_date, leave.end_date) for leave in pending
    )


def get_leave_summary(user) -> dict:
    """
    Verlofsaldo van een gebruiker in dagen.

    remaining = total - used (wat de werknemer nog heeft volgens HR)
    available = remaining - reserved (wat echt nog aangevraagd kan worden)
    """
    totals = LeaveBalance.objects.filter(user=user).aggregate(
        total=Sum("total_balance"),
        used=Sum("used_balance"),
    )

    total = totals["total"] or 0
    used = totals["used"] or 0
    reserved = get_reserved_days(user)
    remaining = total - used

    return {
        "total_balance": total,
        "used_balance": used,
        "remaining": remaining,
        "reserved": reserved,
        "available": remaining - reserved,
    }
