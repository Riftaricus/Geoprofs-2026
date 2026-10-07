import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/nl";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type PlanningCalendarProps = {
  selectedDate: string;
  onChange: (date: string) => void;
};

export function PlanningCalendar({
  selectedDate,
  onChange,
}: PlanningCalendarProps) {
  //de geselecteerde datum uit de planning wordt omgezet naar een Dayjs-datum
  //zodat deze gebruikt kan worden door de MUI DateCalendar
  const value = dayjs(selectedDate);

  //wanneer de gebruiker een andere datum kiest in de kalender,
  //wordt deze teruggegeven als YYYY-MM-DD aan de parent component
  const handleChange = (date: Dayjs | null) => {
    if (!date) {
      return;
    }

    onChange(date.format("YYYY-MM-DD"));
  };

  return (
    <section className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-[#0E3A5B]">Kalender</h2>
      </div>

      <div className="flex justify-center">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nl">
          <DateCalendar value={value} onChange={handleChange} />
        </LocalizationProvider>
      </div>
    </section>
  );
}
