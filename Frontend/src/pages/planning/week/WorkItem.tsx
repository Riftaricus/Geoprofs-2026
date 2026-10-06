import { MapPin } from "lucide-react";

import type { PlanningItem } from "../planning.types";

type WorkItemProps = {
  item: PlanningItem;
  onClick: () => void;
};

export function WorkItem({ item, onClick }: WorkItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-lg border border-slate-200 bg-white p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#3FB950] hover:shadow-md"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#3FB950]" />

        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Werk
        </span>
      </div>

      <p className="text-sm font-semibold text-[#0E3A5B]">{item.title}</p>

      {/* toont het project als dit aan de planning gekoppeld is */}
      {item.projectName && (
        <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-600">
          <MapPin size={14} className="mt-0.5 shrink-0" />

          <span>{item.projectName}</span>
        </div>
      )}
    </button>
  );
}
