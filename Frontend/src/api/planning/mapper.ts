import type { PlanningItem } from "../../pages/planning/planning.types";
import type { PlanningApiItem } from "./model";

export function mapPlanningItem(item: PlanningApiItem): PlanningItem {
  return {
    id: item.id,
    userId: item.user_id,
    date: item.date,
    title: item.title,
    projectId: item.project_id ?? undefined,
    projectName: item.project_name ?? undefined,
    description: item.description ?? undefined,
    type: item.type,
    leaveStatus: item.leave_status ?? undefined,
  };
}
