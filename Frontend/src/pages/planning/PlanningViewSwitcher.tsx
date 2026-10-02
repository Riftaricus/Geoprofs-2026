import type { PlanningView } from "./planning.types";

type PlanningViewSwitcherProps = {
  value: PlanningView;
  onChange: (view: PlanningView) => void;
};

const views: {
  value: PlanningView;
  label: string;
}[] = [
  {
    value: "day",
    label: "Dag",
  },
  {
    value: "week",
    label: "Week",
  },
  {
    value: "month",
    label: "Maand",
  },
];

export function PlanningViewSwitcher({
  value,
  onChange,
}: PlanningViewSwitcherProps) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm">
      {views.map((view) => {
        const isActive = value == view.value;

        return (
          <button
            key={view.value}
            type="button"
            onClick={() => onChange(view.value)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-[#0E3A5B] text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {view.label}
          </button>
        );
      })}
    </div>
  );
}
