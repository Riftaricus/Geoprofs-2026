import { useState } from "react";
import { addMonths, format, parseISO, subMonths } from "date-fns";
import { nl } from "date-fns/locale/nl";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { PlanningItem } from "../../planning/planning.types";
import { MonthPlanning } from "../../planning/month/MonthPlanning";

type LeavePeriodPickerProps = {
  startDate: string;
  endDate: string;
  items: PlanningItem[];
  error?: string;
  onChange: (startDate: string, endDate: string) => void;
};

//kies een periode in de maandplanning:
//eerste klik is de eerste dag, tweede klik de laatste dag
export function LeavePeriodPicker({
  startDate,
  endDate,
  items,
  error,
  onChange,
}: LeavePeriodPickerProps) {
  //de maand die getoond wordt
  const [currentDate, setCurrentDate] = useState<Date>(
    startDate ? new Date(`${startDate}T12:00:00`) : new Date(),
  );

  //true als de volgende klik de laatste dag moet worden
  const [pickingEnd, setPickingEnd] = useState(false);

  const handleDateClick = (date: string) => {
    //een dag voor de eerste dag begint de periode opnieuw
    if (!pickingEnd || date < startDate) {
      onChange(date, date);
      setPickingEnd(true);

      return;
    }

    onChange(startDate, date);
    setPickingEnd(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-ink">Periode *</p>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            aria-label="Vorige maand"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            aria-label="Volgende maand"
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className={error ? "rounded-xl ring-2 ring-danger" : ""}>
        <MonthPlanning
          currentDate={currentDate}
          items={items}
          selectedDate={startDate}
          rangeStart={startDate}
          rangeEnd={endDate}
          onDateClick={handleDateClick}
        />
      </div>

      {/* de gekozen periode, zodat je die ook op een telefoon meteen ziet */}
      {startDate && endDate && (
        <p className="text-sm font-medium text-ink">
          Gekozen: {format(parseISO(startDate), "d MMM yyyy", { locale: nl })} t/m{" "}
          {format(parseISO(endDate), "d MMM yyyy", { locale: nl })}
        </p>
      )}

      {error ? (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : (
        <p className="text-xs text-ink-muted">
          {pickingEnd
            ? "Kies nu de laatste dag van je verlof."
            : "Klik op de eerste dag en daarna op de laatste dag."}
        </p>
      )}
    </div>
  );
}
