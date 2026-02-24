import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ZoneControl from "./pages/ZoneControl";
import EmergencyOverride from "./pages/EmergencyOverride";
import Maintenance from "./pages/Maintenance";
import EnergyReports from "./pages/EnergyReports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/app",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "zones", Component: ZoneControl },
      { path: "emergency", Component: EmergencyOverride },
      { path: "maintenance", Component: Maintenance },
      { path: "energy", Component: EnergyReports },
    ],
  },
]);
