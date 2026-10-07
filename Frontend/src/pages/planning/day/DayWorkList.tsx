import { CalendarDays, MapPin } from "lucide-react";

import type { PlanningItem } from "../planning.types";

type DayWorkListProps = {
  date: string;
  items: PlanningItem[];
  onItemClick: (item: PlanningItem) => void;
};

const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export function DayWorkList({ date, items, onItemClick }: DayWorkListProps) {
  //maakt de geselecteerde datum leesbaar.
  const formattedDate = dateFormatter.format(new Date(`${date}T12:00:00`));

  return (
    <section className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#3FB950]">
          Planning
        </p>

        <h2 className="mt-1 text-lg font-semibold capitalize text-[#0E3A5B]">
          {formattedDate}
        </h2>
      </div>

      <div className="p-4">
        {/* Toont een lege melding als er geen planning is */}
        {items.length == 0 ? (
          <div className="flex min-h-40 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300">
            <CalendarDays size={24} className="text-slate-400" />

            <p className="mt-2 text-sm font-medium text-slate-700">
              Geen werkzaamheden
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Er staat geen planning voor deze dag.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onItemClick(item)}
                className="group rounded-lg border border-slate-200 bg-white p-4 text-left transition-all hover:border-[#3FB950] hover:shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0E3A5B] text-white">
                    <CalendarDays size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <span className="w-fit rounded-full bg-green-50 px-2 py-1 text-[11px] font-medium text-[#3FB950]">
                        Ingepland
                      </span>
                    </div>

                    {item.projectName && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                        <MapPin size={15} />
                        <span>{item.projectName}</span>
                      </div>
                    )}

                    {item.description && (
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
