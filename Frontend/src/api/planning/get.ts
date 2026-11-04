import type { PlanningItem } from "../../pages/planning/planning.types";
import type { PlanningApiItem } from "./model";
import { mapPlanningItem } from "./mapper";
import { apiFetch } from "../client";

export async function getPlanning(): Promise<PlanningItem[]> {
  const data = await apiFetch<PlanningApiItem[]>("/planning-items/");

  return data.map(mapPlanningItem);
}