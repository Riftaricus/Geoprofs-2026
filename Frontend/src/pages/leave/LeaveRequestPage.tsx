import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { eachDayOfInterval, format, isWeekend, parseISO } from "date-fns";
import { nl } from "date-fns/locale/nl";

import { createLeave } from "../../api/leave/create";
import { parseLeaveError, type LeaveFieldErrors } from "../../api/leave/errors";
import { getLeaveSummary } from "../../api/leave/summary";
import { getPlanning } from "../../api/planning/get";
import { FileUploadField } from "../../components/form/FileUploadField";
import { SelectField } from "../../components/form/SelectField";
import { TextareaField } from "../../components/form/TextareaField";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Banner } from "../../components/ui/Banner";

import type { PlanningItem } from "../planning/planning.types";
import { LeavePeriodPicker } from "./components/LeavePeriodPicker";
import { LeaveSummaryCard } from "./components/LeaveSummaryCard";
import {
  ATTACHMENT_EXTENSIONS,
  LEAVE_TYPES,
  MAX_ATTACHMENT_MB,
  MAX_ATTACHMENTS,
  MAX_COMMENT_LENGTH,
  type LeaveFormValues,
  type LeaveSummary,
} from "./leave.types";

function countWorkdays(startDate: string, endDate: string) {
  if (!startDate || !endDate || endDate < startDate) {
    return 0;
  }

  return eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(endDate),
  }).filter((day) => !isWeekend(day)).length;
}

function formatDate(date: string) {
  return format(parseISO(date), "d MMM yyyy", { locale: nl });
}

export function LeaveRequestPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const dateParam = searchParams.get("date") ?? "";

  const [values, setValues] = useState<LeaveFormValues>({
    leaveType: "",
    startDate: dateParam,
    endDate: dateParam,
    comment: "",
  });

  const [attachments, setAttachments] = useState<File[]>([]);
  const [errors, setErrors] = useState<LeaveFieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedPeriod, setSubmittedPeriod] = useState<string | null>(null);
  const [summary, setSummary] = useState<LeaveSummary | null>(null);

  const refreshSummary = async () => {
    try {
      setSummary(await getLeaveSummary());
    } catch (error) {
      console.error(error);
    }
  };

  const [items, setItems] = useState<PlanningItem[]>([]);

  useEffect(() => {
    refreshSummary();

    getPlanning()
      .then(setItems)
      .catch((error) => console.error(error));
  }, []);

  const workdays = countWorkdays(values.startDate, values.endDate);

  const handleChange = (field: keyof LeaveFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    resetMessages();
  };

  //past de gekozen periode aan
  const handleRangeChange = (startDate: string, endDate: string) => {
    setValues((current) => ({ ...current, startDate, endDate }));
    resetMessages();
  };

  const resetMessages = () => {
    setErrors({});
    setGeneralError(null);
    setSubmittedPeriod(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //alleen controleren of de verplichte velden zijn ingevuld.
    //De rest (saldo, overlap, weekenden) controleert de backend.
    const requiredErrors: LeaveFieldErrors = {};

    if (!values.leaveType) requiredErrors.leave_type = "Kies een verloftype.";
    if (!values.startDate) requiredErrors.start_date = "Kies je verlofperiode.";

    setErrors(requiredErrors);

    if (Object.keys(requiredErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    setGeneralError(null);

    try {
      const created = await createLeave({
        leave_type: values.leaveType,
        start_date: values.startDate,
        end_date: values.endDate,
        comment: values.comment.trim(),
        attachments,
      });

      setSubmittedPeriod(
        `${formatDate(created.start_date)} t/m ${formatDate(created.end_date)}`,
      );

      setValues({ leaveType: "", startDate: "", endDate: "", comment: "" });
      setAttachments([]);
      refreshSummary();
    } catch (error) {
      const parsed = parseLeaveError(error);

      setErrors(parsed.fields);
      setGeneralError(parsed.general);
    } finally {
      setSubmitting(false);
    }
  };

  const periodText =
    workdays > 0
      ? `${formatDate(values.startDate)} t/m ${formatDate(values.endDate)}`
      : "";

  return (
    <DashboardLayout role="worker">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="mx-auto flex max-w-6xl flex-col gap-6"
      >
        <header>
          <p className="text-xs font-semibold uppercase tracking-wider text-info">
            Werknemer / GeoProfs
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Verlof aanvragen
          </h1>

          <p className="mt-2 text-sm text-ink-muted">
            Kies je periode en controleer de uren. Je manager beoordeelt je
            aanvraag.
          </p>
        </header>

        {submittedPeriod && (
          <Banner variant="success" title="Aanvraag ingediend">
            Je aanvraag voor {submittedPeriod} is verstuurd.{" "}
            <Link to="/planning" className="font-semibold underline">
              Bekijk je planning
            </Link>
          </Banner>
        )}

        {generalError && (
          <Banner variant="danger" title="Je aanvraag is niet verstuurd">
            {generalError}
          </Banner>
        )}

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="flex flex-col gap-5 rounded-xl border border-line bg-white p-4 shadow-sm sm:p-8">
            <h2 className="text-lg font-semibold text-ink">
              Gegevens van je aanvraag
            </h2>

            <SelectField
              id="leave-type"
              label="Verloftype"
              required
              placeholder="Kies een verloftype"
              value={values.leaveType}
              options={LEAVE_TYPES.map((type) => ({ value: type, label: type }))}
              error={errors.leave_type}
              onChange={(value) => handleChange("leaveType", value)}
            />

            <LeavePeriodPicker
              startDate={values.startDate}
              endDate={values.endDate}
              items={items}
              error={errors.start_date ?? errors.end_date}
              onChange={handleRangeChange}
            />

            <TextareaField
              id="leave-comment"
              label="Toelichting"
              value={values.comment}
              maxLength={MAX_COMMENT_LENGTH}
              hint="Optioneel · Vermeld geen medische informatie."
              error={errors.comment}
              onChange={(value) => handleChange("comment", value)}
            />

            <FileUploadField
              id="leave-attachments"
              label="Bijlagen"
              files={attachments}
              extensions={ATTACHMENT_EXTENSIONS}
              maxFiles={MAX_ATTACHMENTS}
              maxSizeMb={MAX_ATTACHMENT_MB}
              hint="Optioneel · Bijvoorbeeld een doktersverklaring of afspraaknotitie."
              error={errors.attachments}
              disabled={submitting}
              onChange={(files) => {
                setAttachments(files);
                resetMessages();
              }}
            />
          </section>

          <LeaveSummaryCard
            periodText={periodText}
            leaveType={values.leaveType}
            workdays={workdays}
            available={summary?.available ?? null}
            submitting={submitting}
            onCancel={() => navigate("/planning")}
          />
        </div>
      </form>
    </DashboardLayout>
  );
}
