import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import GuestPortal from "./pages/GuestPortal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/manager",
    Component: ManagerDashboard,
  },
  {
    path: "/staff",
    Component: StaffDashboard,
  },
  {
    path: "/guest",
    Component: GuestPortal,
  },
]);
