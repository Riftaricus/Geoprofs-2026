import { ApiError } from "../client";

//veldnamen van het formulier waar een backendfout bij kan horen
export type LeaveFieldName =
  | "leave_type"
  | "start_date"
  | "end_date"
  | "comment"
  | "attachments";

export type LeaveFieldErrors = Partial<Record<LeaveFieldName, string>>;

const FIELD_NAMES: LeaveFieldName[] = [
  "leave_type",
  "start_date",
  "end_date",
  "comment",
  "attachments",
];

//DRF stuurt validatiefouten als { veld: ["melding"] }
function firstMessage(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    return typeof value[0] == "string" ? value[0] : undefined;
  }

  return typeof value == "string" ? value : undefined;
}

//zet een fout van de API om naar meldingen per veld plus een algemene melding
export function parseLeaveError(error: unknown): {
  fields: LeaveFieldErrors;
  general: string | null;
} {
  const fields: LeaveFieldErrors = {};

  if (error instanceof ApiError && error.status == 400) {
    const body = (error.body ?? {}) as Record<string, unknown>;

    for (const name of FIELD_NAMES) {
      const message = firstMessage(body[name]);

      if (message) {
        fields[name] = message;
      }
    }

    if (Object.keys(fields).length > 0) {
      return { fields, general: null };
    }
  }

  return {
    fields,
    general:
      error instanceof Error
        ? error.message
        : "Je aanvraag kon niet worden verstuurd.",
  };
}
