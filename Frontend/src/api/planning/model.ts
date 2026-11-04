export type PlanningApiItem = {
  id: number;
  user_id: number;
  title: string;
  time_start: string;
  time_end: string;
  item_type: "work" | "leave" | "break";
  leave_id: number | null;
};
