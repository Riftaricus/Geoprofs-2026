from datetime import datetime
from api_geoprofs.models.audit_log import Audit_Log
from api_geoprofs.models.notification import Notification

def log(comment: str, user_id: int) -> bool:
    timestamp = datetime.now()

    if timestamp == None:
        return False
    if comment == None or user_id == None:
        return False
    if comment.__len__() >= 100:
        return False

    log = Audit_Log(comment=comment, timestamp=timestamp)
    log.save()
    return True

def notify(title: str, description: str, user_id: int) -> bool:
    timestamp = datetime.now()

    if timestamp == None:
        return False
    if title == None or description == None or user_id == None:
        return False

    notification = Notification(title=title, description=description, user_id=user_id, timestamp=timestamp)
    notification.save()
    return True