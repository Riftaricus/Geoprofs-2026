import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

type DashboardLayoutProps = {
  role: "manager" | "worker";
  children: ReactNode;
};

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar role={role} />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
