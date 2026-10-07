import type { PlanningItem } from "../planning.types";
import { WorkItem } from "./WorkItem";

type WeekDayColumnProps = {
  date: Date;
  items: PlanningItem[];
  selectedDate: string;

  onDateClick: (date: string) => void;
  onItemClick: (item: PlanningItem) => void;
};

const weekdayFormatter = new Intl.DateTimeFormat("nl-NL", {
  weekday: "short",
});

const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "short",
});

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function WeekDayColumn({
  date,
  items,
  selectedDate,
  onDateClick,
  onItemClick,
}: WeekDayColumnProps) {
  //zet de datum om naar hetzelfde formaat als de planning.
  const dateKey = getDateKey(date);
  const isSelected = dateKey == selectedDate;

  return (
    <div className="flex min-h-107.5 min-w-52.5 flex-1 flex-col border-r border-slate-200 last:border-r-0">
      <button
        type="button"
        onClick={() => onDateClick(dateKey)}
        className={`border-b border-slate-200 p-3 text-left transition-colors ${
          isSelected ? "bg-[#0E3A5B] text-white" : "hover:bg-slate-50"
        }`}
      >
        <p
          className={`text-xs font-semibold uppercase ${
            isSelected ? "text-blue-100" : "text-slate-400"
          }`}
        >
          {weekdayFormatter.format(date)}
        </p>

        <p className="mt-1 text-lg font-bold">{dateFormatter.format(date)}</p>
      </button>

      <div
        className={`flex flex-1 flex-col gap-2 p-2 ${
          isSelected ? "bg-blue-50/30" : ""
        }`}
      >
        {/* Toont de planning of een melding als er niets gepland staat. */}
        {items.length > 0 ? (
          items.map((item) => (
            <WorkItem
              key={item.id}
              item={item}
              onClick={() => onItemClick(item)}
            />
          ))
        ) : (
          <button
            type="button"
            onClick={() => onDateClick(dateKey)}
            className="flex min-h-24 flex-1 items-center justify-center rounded-lg border border-dashed border-slate-200 p-3 text-xs text-slate-400 transition-colors hover:border-[#3FB950] hover:text-slate-500"
          >
            Geen planning
          </button>
        )}
      </div>
    </div>
  );
}
