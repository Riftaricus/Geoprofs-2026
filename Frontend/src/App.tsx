import {
  Navigate,
  Route,
  Routes,
} from "react-router";

import { ManagerPage } from "./pages/dashboard/ManagerPage";
import { WorkerPage } from "./pages/dashboard/WorkerPage";
import { ProfilePage } from "./pages/ProfilePage";
import Login from "../src/pages/login";

type UserRole = "manager" | "worker";

function App() {
  //dit is even om te testen als je manager bent
  //als je het anders wil verander de role naar "worker"
  //kan btw later weg :)
  const role =  "manager" as UserRole;

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login/>}
        />
      {role == "manager" && (
        <Route
          path="/dashboard"
          element={<ManagerPage />}
        />
      )}

      {role == "worker" && (
        <Route
          path="/dashboard"
          element={<WorkerPage />}
        />
      )}

      <Route
        path="/profiel"
        element={<ProfilePage />}
      />

      {role == "manager" && (
        <>
          <Route
            path="/werknemers"
            element={<div>Werknemers</div>}
          />

          <Route
            path="/rapporten"
            element={<div>Rapporten</div>}
          />
        </>
      )}

      <Route
        path="/projecten"
        element={<div>Projecten</div>}
      />

      <Route
        path="/planning"
        element={<div>Planning</div>}
      />

      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="*"
        element={<Navigate to="/dashboard" replace />}
      />
    </Routes>
  );
}

export default App;

