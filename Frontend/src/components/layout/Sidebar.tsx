import { NavLink } from "react-router";
import { BrowserView } from 'react-device-detect';

import {
  BarChart3,
  CalendarDays,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  User,
  Users,
} from "lucide-react";

type SidebarProps = {
  role: "manager" | "worker";
};

const managerNavigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Werknemers",
    path: "/werknemers",
    icon: Users,
  },
  {
    label: "Projecten",
    path: "/projecten",
    icon: FolderKanban,
  },
  {
    label: "Planning",
    path: "/planning",
    icon: CalendarDays,
  },
  {
    label: "Rapporten",
    path: "/rapporten",
    icon: BarChart3,
  },
];

const workerNavigation = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Planning",
    path: "/planning",
    icon: CalendarDays,
  },
  {
    label: "Projecten",
    path: "/projecten",
    icon: FolderKanban,
  },
];

const baseLinkClasses =
  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors";

export function Sidebar({ role }: SidebarProps) {
  const navigation = role == "manager" ? managerNavigation : workerNavigation;

  return (
    <aside id="sidebar" className="sticky top-0 flex max-h-dvh w-64 shrink-0 flex-col bg-[#0E3A5B] p-4 text-white max-lg:p-2 max-lg:w-16">
      <div className="mb-8 flex items-center justify-center gap-3 max-lg:p-0 px-2 py-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3FB950] shadow-sm">
          <span className="text-lg font-bold text-white">G</span>
        </div>

        <BrowserView>
          <div>
            <h1 className="text-lg font-bold tracking-tight">GeoProfs</h1>

            <p className="text-xs text-blue-100">Verlof & planning</p>
          </div>
        </BrowserView>

      </div>

      <div className="h-full">
        <p className="max-lg:mb-0 max-lg:px-0 mb-2 px-3 text-[11px] text-center font-semibold uppercase tracking-wider text-blue-200">
          Menu
        </p>

        <nav className="flex flex-col gap-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${baseLinkClasses} ${isActive
                    ? "bg-white text-[#0E3A5B] shadow-sm"
                    : "text-blue-50 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-md ${isActive
                        ? "bg-[#3FB950] text-white"
                        : "bg-white/10 text-blue-100"
                        }`}
                    >
                      <Icon size={17} strokeWidth={1.8} />
                    </span>
                    <BrowserView>
                      <span>{item.label}</span>
                    </BrowserView>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col gap-1">
        <NavLink
          to="/profiel"
          className={({ isActive }) =>
            `${baseLinkClasses} ${isActive
              ? "bg-white text-[#0E3A5B]"
              : "text-blue-50 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-md ${isActive
                  ? "bg-[#3FB950] text-white"
                  : "bg-white/10 text-blue-100"
                  }`}
              >
                <User size={17} strokeWidth={1.8} />
              </span>
              <BrowserView>
                <span>Profiel</span>
              </BrowserView>
            </>
          )}
        </NavLink>

        <button
          type="button"
          className={`${baseLinkClasses} w-full text-left text-blue-50 hover:bg-white/10 hover:text-white`}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10 text-blue-100">
            <LogOut size={17} strokeWidth={1.8} />
          </span>
          <BrowserView>
            <span>Uitloggen</span>
          </BrowserView>
        </button>
      </div>
    </aside>
  );
}
