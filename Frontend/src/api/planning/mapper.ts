import type { PlanningItem } from "../../pages/planning/planning.types";
import type { PlanningApiItem } from "./model";

export function mapPlanningItem(item: PlanningApiItem): PlanningItem {
  return {
    id: item.id,
    userId: item.user_id,
    date: item.time_start.slice(0, 10),
    startTime: item.time_start,
    endTime: item.time_end,
    title: item.title,
    type: item.item_type,
  };
}
