from datetime import datetime
from api_geoprofs.models.audit_log import AuditLog


def log(comment: str) -> bool:
    timestamp = datetime.now()

    if timestamp == None:
        return False
    if comment == None:
        return False
    if comment.__len__() >= 100:
        return False

    log = AuditLog(comment=comment, timestamp=timestamp)
    log.save()
    return True