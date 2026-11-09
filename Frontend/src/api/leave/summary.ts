import { apiFetch } from "../client";
import type { LeaveSummary } from "../../pages/leave/leave.types";
import { mapLeaveSummary } from "./mapper";
import type { LeaveSummaryApi } from "./model";

export async function getLeaveSummary(): Promise<LeaveSummary> {
  const data = await apiFetch<LeaveSummaryApi>("/leave_balances/summary/");

  return mapLeaveSummary(data);
}
