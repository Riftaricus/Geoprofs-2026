import type { PlanningItem } from "../../pages/planning/planning.types";
import type { PlanningApiItem } from "./model";
import { mapPlanningItem } from "./mapper";

export async function getPlanning(): Promise<PlanningItem[]> {
  const response = await fetch("/api/planning/", {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Planning ophalen mislukt.");
  }

  const data: PlanningApiItem[] = await response.json();

  return data.map(mapPlanningItem);
}
