import { format } from "date-fns";

import type { PlanningItem } from "../planning.types";

type MonthDayCellProps = {
  date: Date;
  items: PlanningItem[];
  isCurrentMonth: boolean;
  isSelected: boolean;

  onClick: (date: string) => void;
};

export function MonthDayCell({
  date,
  items,
  isCurrentMonth,
  isSelected,
  onClick,
}: MonthDayCellProps) {
  //zet de datum om naar het formaat dat de planning gebruikt.
  const dateKey = format(date, "yyyy-MM-dd");

  return (
    <button
      type="button"
      onClick={() => onClick(dateKey)}
      className={`min-h-32 border-r border-b border-slate-200 p-2 text-left transition-colors hover:bg-slate-50 ${
        !isCurrentMonth ? "bg-slate-50 text-slate-400" : "bg-white"
      } ${isSelected ? "ring-2 ring-inset ring-[#3FB950]" : ""}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
            isSelected ? "bg-[#0E3A5B] text-white" : "text-slate-700"
          }`}
        >
          {format(date, "d")}
        </span>

        {items.length > 0 && (
          <span className="text-[10px] font-medium text-slate-400">
            {items.length}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {items.slice(0, 3).map((item) => (
          <div
            key={item.id}
            className="truncate rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-[#0E3A5B]"
          >
            {item.projectName ?? item.title}
          </div>
        ))}

        {items.length > 3 && (
          <span className="px-1 text-[10px] text-slate-400">
            +{items.length - 3} meer
          </span>
        )}
      </div>
    </button>
  );
}
