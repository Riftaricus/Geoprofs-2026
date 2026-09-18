from datetime import datetime
from models import Audit_Log


def log(comment: str) -> bool:
    timestamp = datetime.now()

    if timestamp == None:
        return False
    if comment == None:
        return False
    if comment.__len__() >= 100:
        return False

    log = Audit_Log(comment=comment, timestamp=timestamp)
    log.save()
    return True