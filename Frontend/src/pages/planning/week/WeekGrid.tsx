import { addDays, startOfWeek } from "date-fns";

import { nl } from "date-fns/locale/nl";

import type { PlanningItem } from "../planning.types";
import { WeekDayColumn } from "./WeekDayColumn";

type WeekGridProps = {
  currentDate: Date;
  items: PlanningItem[];
  selectedDate: string;

  onDateClick: (date: string) => void;
  onItemClick: (item: PlanningItem) => void;
};

export function WeekGrid({
  currentDate,
  items,
  selectedDate,
  onDateClick,
  onItemClick,
}: WeekGridProps) {
  //bepaalt de maandag van de huidige week
  const monday = startOfWeek(currentDate, {
    weekStartsOn: 1,
    locale: nl,
  });

  const days = Array.from({ length: 5 }, (_, index) => addDays(monday, index));

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
      <div className="flex min-w-262.5">
        {days.map((date) => {
          const dateKey = date.toISOString().slice(0, 10);

          //filtert de planning voor de betreffende dag
          const dayItems = items.filter((item) => item.date == dateKey);

          return (
            <WeekDayColumn
              key={dateKey}
              date={date}
              items={dayItems}
              selectedDate={selectedDate}
              onDateClick={onDateClick}
              onItemClick={onItemClick}
            />
          );
        })}
      </div>
    </div>
  );
}
