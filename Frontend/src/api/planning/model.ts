export type PlanningApiItem = {
  id: number;
  user_id: number;
  date: string;
  title: string;
  project_id?: number | null;
  project_name?: string | null;
  description?: string | null;
  type: "work" | "leave" | "break";
  leave_status?: "pending" | "accepted" | "denied" | null;
};