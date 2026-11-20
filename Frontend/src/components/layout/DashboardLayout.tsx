import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type DashboardLayoutProps = {
  role: "manager" | "worker";
  children: ReactNode;
};

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-dvh bg-canvas text-slate-900">
      <div className="flex min-h-dvh max-h-dvh">
        <Sidebar role={role} />

        <main className="max-h-dvh flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
