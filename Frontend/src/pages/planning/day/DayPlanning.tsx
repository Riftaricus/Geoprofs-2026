import type { PlanningItem } from "../planning.types";
import { DayWorkList } from "./DayWorkList";

type DayPlanningProps = {
  date: string;
  items: PlanningItem[];
  onItemClick: (item: PlanningItem) => void;
};

export function DayPlanning({ date, items, onItemClick }: DayPlanningProps) {
  //filtert de planning op de geselecteerde dag.
  const dayItems = items.filter((item) => item.date == date);

  return <DayWorkList date={date} items={dayItems} onItemClick={onItemClick} />;
}
