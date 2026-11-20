import { apiFetch } from "../client";
import type { LeaveApiItem, LeaveCreatePayload } from "./model";

//bijlagen kunnen niet als JSON, dus de aanvraag gaat als multipart/form-data
export async function createLeave(
  payload: LeaveCreatePayload,
): Promise<LeaveApiItem> {
  const body = new FormData();

  body.append("leave_type", payload.leave_type);
  body.append("start_date", payload.start_date);
  body.append("end_date", payload.end_date);
  body.append("comment", payload.comment);

  payload.attachments.forEach((file) => body.append("attachments", file));

  return apiFetch<LeaveApiItem>("/leaves/", {
    method: "POST",
    body,
  });
}
