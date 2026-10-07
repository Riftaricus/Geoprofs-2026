import { useEffect, useMemo, useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { nl } from "date-fns/locale/nl";

import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { getPlanning } from "../../api/planning/get";

import { PlanningCalendar } from "./components/PlanningCalendar";
import { PlanningDetails } from "./components/PlanningDetails";
import { PlanningHeader } from "./PlanningHeader";
import { DayPlanning } from "./day/DayPlanning";
import { MonthPlanning } from "./month/MonthPlanning";
import { WeekPlanning } from "./week/WeekPlanning";

import type { PlanningItem, PlanningView } from "./planning.types";
//zet een Date om naar het formaat dat de planning gebruikt
function getDateKey(date: Date) {
  return format(date, "yyyy-MM-dd");
}

export function PlanningPage() {
  //bepaalt welke planningweergave actief is
  const [view, setView] = useState<PlanningView>("week");

  //houdt de huidige datum van de planning bij
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  //houdt de geselecteerde dag bij
  const [selectedDate, setSelectedDate] = useState<string>(
    getDateKey(new Date()),
  );

  //bevat de planning die vanuit de backend wordt opgehaald.
  const [items, setItems] = useState<PlanningItem[]>([]);

  //houdt bij of de planning nog wordt geladen
  const [loading, setLoading] = useState(true);

  //bevat een eventuele fout tijdens het ophalen van de planning
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlanning() {
      try {
        setLoading(true);
        setError(null);

        //haalt de planning op vanuit de backend
        const data = await getPlanning();

        setItems(data);
      } catch (error) {
        console.error(error);
        setError("Planning kon niet worden geladen :(");
      } finally {
        setLoading(false);
      }
    }

    loadPlanning();
  }, []);

  //bepaalt de titel bovenaan de pagina op basis van de actieve weergave
  const title = useMemo(() => {
    if (view == "day") {
      return format(currentDate, "EEEE d MMMM yyyy", {
        locale: nl,
      });
    }

    if (view == "month") {
      return format(currentDate, "MMMM yyyy", {
        locale: nl,
      });
    }

    const weekStart = startOfWeek(currentDate, {
      weekStartsOn: 1,
      locale: nl,
    });

    const weekEnd = addDays(weekStart, 4);

    return `${format(weekStart, "d MMM", {
      locale: nl,
    })} - ${format(weekEnd, "d MMM yyyy", {
      locale: nl,
    })}`;
  }, [currentDate, view]);

  //gaat naar de vorige dag, week of maand
  const handlePrevious = () => {
    if (view == "day") {
      const previous = subDays(currentDate, 1);

      setCurrentDate(previous);
      setSelectedDate(getDateKey(previous));

      return;
    }

    if (view == "week") {
      const previous = subWeeks(currentDate, 1);

      setCurrentDate(previous);
      setSelectedDate(getDateKey(previous));

      return;
    }

    const previous = subMonths(currentDate, 1);

    setCurrentDate(previous);
    setSelectedDate(getDateKey(previous));
  };

  //gaat naar de volgende dag, week of maand
  const handleNext = () => {
    if (view == "day") {
      const next = addDays(currentDate, 1);

      setCurrentDate(next);
      setSelectedDate(getDateKey(next));

      return;
    }

    if (view == "week") {
      const next = addWeeks(currentDate, 1);

      setCurrentDate(next);
      setSelectedDate(getDateKey(next));

      return;
    }

    const next = addMonths(currentDate, 1);

    setCurrentDate(next);
    setSelectedDate(getDateKey(next));
  };

  //springt terug naar vandaag
  const handleToday = () => {
    const today = new Date();

    setCurrentDate(today);
    setSelectedDate(getDateKey(today));
  };

  //wisselt tussen dag, week en maandweergave
  const handleViewChange = (nextView: PlanningView) => {
    setView(nextView);

    if (nextView == "week") {
      const weekStart = startOfWeek(currentDate, {
        weekStartsOn: 1,
        locale: nl,
      });

      setSelectedDate(getDateKey(weekStart));

      return;
    }

    setSelectedDate(getDateKey(currentDate));
  };

  //selecteert de datum van het aangeklikte planningitem
  const handleItemClick = (item: PlanningItem) => {
    setSelectedDate(item.date);

    setCurrentDate(new Date(`${item.date}T12:00:00`));
  };

  //selecteert een datum vanuit de kalender of planning
  const handleDateClick = (date: string) => {
    setSelectedDate(date);

    setCurrentDate(new Date(`${date}T12:00:00`));
  };

  //wordt aangeroepen wanneer de gebruiker verlof wil aanvragen.
  const handleRequestLeave = () => {
    console.log("Verlof aanvragen voor:", selectedDate);
  };

  //toon een laadmelding zolang de backend nog antwoordt
  if (loading) {
    return (
      <DashboardLayout role="worker">
        <div className="flex min-h-full items-center justify-center">
          <p className="text-sm text-slate-500">Planning laden...</p>
        </div>
      </DashboardLayout>
    );
  }

  //toont een fout als het ophalen mislukt
  if (error) {
    return (
      <DashboardLayout role="worker">
        <div className="flex min-h-full items-center justify-center">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="worker">
      <div className="flex min-h-full flex-col gap-4">
        <PlanningHeader
          view={view}
          title={title}
          onViewChange={handleViewChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onToday={handleToday}
        />

        <div className="grid min-h-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <main className="min-w-0">
            {/* Toont de juiste planning op basis van de geselecteerde view */}
            {view == "day" && (
              <DayPlanning
                date={getDateKey(currentDate)}
                items={items}
                onItemClick={handleItemClick}
              />
            )}

            {view == "week" && (
              <WeekPlanning
                currentDate={currentDate}
                items={items}
                selectedDate={selectedDate}
                onDateClick={handleDateClick}
                onItemClick={handleItemClick}
              />
            )}

            {view == "month" && (
              <MonthPlanning
                currentDate={currentDate}
                items={items}
                selectedDate={selectedDate}
                onDateClick={handleDateClick}
              />
            )}
          </main>

          <aside className="flex flex-col gap-4">
            <PlanningCalendar
              selectedDate={selectedDate}
              onChange={handleDateClick}
            />

            <PlanningDetails
              selectedDate={selectedDate}
              items={items}
              onRequestLeave={handleRequestLeave}
            />
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
