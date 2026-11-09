import { CalendarDays, Send } from "lucide-react";

import { Button } from "../../../components/ui/Button";

type LeaveSummaryCardProps = {
  periodText: string;
  leaveType: string;
  workdays: number;
  available: number | null;
  submitting: boolean;
  onCancel: () => void;
};

//bijv. "1 dag" of "3 dagen"
function formatDays(days: number) {
  return `${days} ${days == 1 ? "dag" : "dagen"}`;
}

export function LeaveSummaryCard({
  periodText,
  leaveType,
  workdays,
  available,
  submitting,
  onCancel,
}: LeaveSummaryCardProps) {
  const hasPeriod = workdays > 0;
  const freeAfter = available != null ? available - workdays : null;

  return (
    <section className="rounded-xl border border-line bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold text-ink">Controleer je aanvraag</h2>

      <div className="mt-5 flex items-start gap-3">
        <CalendarDays size={22} className="mt-0.5 shrink-0 text-geo-800" />

        {hasPeriod ? (
          <div>
            <p className="text-sm font-semibold text-ink">{periodText}</p>

            <p className="text-sm text-ink-muted">
              {leaveType || "Geen verloftype"} · {formatDays(workdays)}
            </p>
          </div>
        ) : (
          <p className="text-sm text-ink-muted">
            Kies een periode om je aanvraag te controleren.
          </p>
        )}
      </div>

      <hr className="my-5 border-line" />

      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex items-baseline justify-between">
          <dt className="text-ink">Totaal aangevraagd</dt>
          <dd className="text-2xl font-bold text-ink">{formatDays(workdays)}</dd>
        </div>

        <div className="flex items-baseline justify-between">
          <dt className="text-ink-muted">Resterend saldo</dt>
          <dd className="font-semibold text-ink">
            {available != null ? formatDays(available) : "–"}
          </dd>
        </div>

        <div className="flex items-baseline justify-between">
          <dt className="text-ink-muted">Vrij na reservering</dt>
          <dd
            className={`font-semibold ${freeAfter != null && freeAfter < 0 ? "text-danger" : "text-ink"}`}
          >
            {freeAfter != null ? formatDays(freeAfter) : "–"}
          </dd>
        </div>
      </dl>

      <hr className="my-5 border-line" />

      <p className="text-sm text-ink-muted">
        Je aanvraag gaat naar je manager. Je ontvangt een melding zodra er een
        besluit is.
      </p>

      <div className="mt-5 flex flex-col items-stretch gap-3 sm:items-start">
        <Button
          type="submit"
          icon={<Send size={17} />}
          disabled={submitting}
          className="w-full sm:w-auto"
        >
          {submitting ? "Bezig met indienen..." : "Aanvraag indienen"}
        </Button>

        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={submitting}
          className="w-full sm:w-auto"
        >
          Annuleren
        </Button>
      </div>
    </section>
  );
}
