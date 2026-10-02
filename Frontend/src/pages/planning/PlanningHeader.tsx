import { ChevronLeft, ChevronRight } from "lucide-react";

import type { PlanningView } from "./planning.types";
import { PlanningViewSwitcher } from "./PlanningViewSwitcher";

type PlanningHeaderProps = {
  view: PlanningView;
  title: string;

  onViewChange: (view: PlanningView) => void;
  onPrevious: () => void;
  onNext: () => void;
  onToday: () => void;
};

export function PlanningHeader({
  view,
  title,
  onViewChange,
  onPrevious,
  onNext,
  onToday,
}: PlanningHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#3FB950]">
          Planning
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0E3A5B]">
          {title}
        </h1>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Vorige periode"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-white hover:text-[#0E3A5B]"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={onToday}
            className="px-3 text-sm font-medium text-[#0E3A5B] hover:underline"
          >
            Vandaag
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Volgende periode"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-white hover:text-[#0E3A5B]"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <PlanningViewSwitcher value={view} onChange={onViewChange} />
      </div>
    </header>
  );
}
