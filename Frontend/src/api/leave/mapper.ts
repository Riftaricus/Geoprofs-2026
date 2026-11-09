import type { LeaveSummary } from "../../pages/leave/leave.types";
import type { LeaveSummaryApi } from "./model";

export function mapLeaveSummary(summary: LeaveSummaryApi): LeaveSummary {
  return {
    totalBalance: summary.total_balance,
    usedBalance: summary.used_balance,
    remaining: summary.remaining,
    reserved: summary.reserved,
    available: summary.available,
  };
}
