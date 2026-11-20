import { Navigate, Route, Routes } from "react-router";

import { ManagerPage } from "./pages/dashboard/ManagerPage";
import { WorkerPage } from "./pages/dashboard/WorkerPage";
import { ProfilePage } from "./pages/ProfilePage";
import { PlanningPage } from "./pages/planning/PlanningPage";
import { LeaveRequestPage } from "./pages/leave/LeaveRequestPage";
import Login from "./pages/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";

type UserRole = "manager" | "worker";

function App() {
  const role = "manager" as UserRole;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        {role == "manager" && (
          <>
            <Route path="/dashboard" element={<ManagerPage />} />
            <Route path="/werknemers" element={<div>Werknemers</div>} />
            <Route path="/rapporten" element={<div>Rapporten</div>} />
          </>
        )}

        {role == "worker" && (
          <Route path="/dashboard" element={<WorkerPage />} />
        )}

        <Route path="/profiel" element={<ProfilePage />} />
        <Route path="/projecten" element={<div>Projecten</div>} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/verlof/aanvragen" element={<LeaveRequestPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
