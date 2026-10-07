import { CalendarDays, Clock3, FileText, Plus } from "lucide-react";

import type { PlanningItem } from "../planning.types";

type PlanningDetailsProps = {
  selectedDate: string;
  items: PlanningItem[];
  onRequestLeave: () => void;
};

const dateFormatter = new Intl.DateTimeFormat("nl-NL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

export function PlanningDetails({
  selectedDate,
  items,
  onRequestLeave,
}: PlanningDetailsProps) {
  //filtert alleen de planning van de geselecteerde dag
  const selectedItems = items.filter((item) => item.date == selectedDate);

  //maakt de datum leesbaar voor de gebruiker
  const formattedDate = dateFormatter.format(
    new Date(`${selectedDate}T12:00:00`),
  );

  return (
    <section className="flex flex-col rounded-xl bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Geselecteerde dag
        </p>

        <h2 className="mt-1 capitalize text-base font-semibold text-[#0E3A5B]">
          {formattedDate}
        </h2>
      </div>

      <div className="flex flex-col gap-3 p-4">
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0E3A5B] text-white">
                  {/* ander icoon voor werk en verlof */}
                  {item.type == "work" ? (
                    <CalendarDays size={17} />
                  ) : (
                    <FileText size={17} />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>

                  {item.projectName && (
                    <p className="mt-1 text-sm text-slate-600">
                      {item.projectName}
                    </p>
                  )}

                  {item.description && (
                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 p-4 text-center">
            <Clock3 size={20} className="mx-auto text-slate-400" />

            <p className="mt-2 text-sm font-medium text-slate-700">
              Geen planning
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Er staat voor deze dag geen werk ingepland.
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={onRequestLeave}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#3FB950] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#349b43]"
        >
          <Plus size={17} />
          Verlof aanvragen
        </button>
      </div>
    </section>
  );
}
