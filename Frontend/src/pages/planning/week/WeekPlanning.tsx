import type { PlanningItem } from "../planning.types";
import { WeekGrid } from "./WeekGrid";

type WeekPlanningProps = {
  currentDate: Date;
  items: PlanningItem[];
  selectedDate: string;

  onDateClick: (date: string) => void;
  onItemClick: (item: PlanningItem) => void;
};

export function WeekPlanning({
  currentDate,
  items,
  selectedDate,
  onDateClick,
  onItemClick,
}: WeekPlanningProps) {
    //geeft de planning door aan het weekrooster.
  return (
    <section className="min-w-0">
      <WeekGrid
        currentDate={currentDate}
        items={items}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        onItemClick={onItemClick}
      />
    </section>
  );
}
