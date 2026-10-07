import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { nl } from "date-fns/locale/nl";

import type { PlanningItem } from "../planning.types";
import { MonthDayCell } from "./MonthDayCell";

type MonthPlanningProps = {
  currentDate: Date;
  items: PlanningItem[];
  selectedDate: string;

  onDateClick: (date: string) => void;
};

const weekdays = ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"];

export function MonthPlanning({
  currentDate,
  items,
  selectedDate,
  onDateClick,
}: MonthPlanningProps) {
  //bepaalt het begin en einde van de maand
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const calendarStart = startOfWeek(monthStart, {
    weekStartsOn: 1,
    locale: nl,
  });

  const calendarEnd = endOfWeek(monthEnd, {
    weekStartsOn: 1,
    locale: nl,
  });

  const days: Date[] = [];

  let current = calendarStart;

  while (current <= calendarEnd) {
    days.push(current);
    current = addDays(current, 1);
  }

  return (
    <section className="min-w-0">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Maandplanning
        </p>

        <h2 className="mt-1 text-xl font-semibold capitalize text-[#0E3A5B]">
          {format(currentDate, "MMMM yyyy", {
            locale: nl,
          })}
        </h2>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="grid grid-cols-7 border-b border-slate-200">
          {weekdays.map((day) => (
            <div
              key={day}
              className="border-r border-slate-200 px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-slate-400 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {days.map((date) => {
            const dateKey = format(date, "yyyy-MM-dd");

            //filtert de planning voor deze specifieke dag
            const dayItems = items.filter((item) => item.date == dateKey);

            return (
              <MonthDayCell
                key={dateKey}
                date={date}
                items={dayItems}
                isCurrentMonth={isSameMonth(date, currentDate)}
                isSelected={dateKey == selectedDate}
                onClick={onDateClick}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
