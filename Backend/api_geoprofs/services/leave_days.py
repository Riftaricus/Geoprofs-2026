from datetime import date, timedelta


def count_workdays(start_date: date, end_date: date) -> int:
    """
    Tel het aantal werkdagen (maandag t/m vrijdag) tussen twee datums,
    beide dagen inbegrepen.
    """
    if end_date < start_date:
        return 0

    days = 0
    current = start_date

    while current <= end_date:
        if current.weekday() < 5:
            days += 1

        current += timedelta(days=1)

    return days


def iter_workdays(start_date: date, end_date: date):
    """
    Geeft elke werkdag (maandag t/m vrijdag) tussen twee datums terug.
    """
    current = start_date

    while current <= end_date:
        if current.weekday() < 5:
            yield current

        current += timedelta(days=1)
