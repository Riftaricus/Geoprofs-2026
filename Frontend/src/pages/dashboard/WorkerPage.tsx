import { DashboardLayout } from "../../components/layout/DashboardLayout";

export function WorkerPage() {
  return (
    <DashboardLayout role="worker">
      <div className="h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0E3A5B]">
          Werknemers dashboard
        </h1>

        <p className="mt-2 text-slate-500">Welkom op je dashboard.</p>
      </div>
    </DashboardLayout>
  );
}
