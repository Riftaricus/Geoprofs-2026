from rest_framework import serializers

from api_geoprofs.models import Leave
from api_geoprofs.services.leave_attachments import (
    validate_attachments as check_attachments,
)
from api_geoprofs.services.leave_balance import get_leave_summary
from api_geoprofs.services.leave_days import count_workdays
from api_geoprofs.services.leave_request import create_leave_request

LEAVE_TYPES = (
    "Vakantie",
    "Persoonlijk verlof",
    "Bijzonder verlof",
    "Studieverlof",
)

MAX_COMMENT_LENGTH = 100


class LeaveRequestSerializer(serializers.ModelSerializer):
    """
    Serializer voor het aanvragen van verlof door de ingelogde werknemer.
    De gebruiker komt uit het request en wordt nooit uit de body gelezen.
    """

    leave_type = serializers.ChoiceField(choices=LEAVE_TYPES, source="reason")
    comment = serializers.CharField(
        max_length=MAX_COMMENT_LENGTH,
        required=False,
        allow_blank=True,
        allow_null=True,
    )
    attachments = serializers.ListField(
        child=serializers.FileField(allow_empty_file=False),
        required=False,
        write_only=True,
    )
    attachment_files = serializers.SerializerMethodField()
    workdays = serializers.SerializerMethodField()

    class Meta:
        model = Leave
        fields = [
            "id",
            "leave_type",
            "start_date",
            "end_date",
            "comment",
            "status",
            "workdays",
            "attachments",
            "attachment_files",
        ]
        read_only_fields = ["id", "status"]

    def get_workdays(self, leave: Leave) -> int:
        return count_workdays(leave.start_date, leave.end_date)

    def get_attachment_files(self, leave: Leave) -> list:
        return [
            {"id": file.id, "name": file.original_name, "size": file.size}
            for file in leave.attachments.all()
        ]

    def validate_attachments(self, files):
        check_attachments(files)

        return files

    def validate(self, attrs):
        user = self.context["request"].user
        start_date = attrs["start_date"]
        end_date = attrs["end_date"]

        if end_date < start_date:
            raise serializers.ValidationError(
                {"end_date": "De einddatum ligt voor de startdatum."}
            )

        workdays = count_workdays(start_date, end_date)

        if workdays == 0:
            raise serializers.ValidationError(
                {"end_date": "Deze periode bevat geen werkdagen."}
            )

        overlapping = Leave.objects.filter(
            user=user,
            start_date__lte=end_date,
            end_date__gte=start_date,
            status__in=[Leave.LeaveStatus.PENDING, Leave.LeaveStatus.ACCEPTED],
        ).exists()

        if overlapping:
            raise serializers.ValidationError(
                {"start_date": "Je hebt in deze periode al verlof aangevraagd."}
            )

        available = get_leave_summary(user)["available"]

        if workdays > available:
            raise serializers.ValidationError(
                {
                    "end_date": (
                        f"Je vraagt {workdays} dagen aan, maar je hebt "
                        f"nog {max(available, 0)} dagen beschikbaar."
                    )
                }
            )

        return attrs

    def create(self, validated_data):
        return create_leave_request(self.context["request"].user, validated_data)
