import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Component/Root/Root";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import User from "./Component/User_dashboard/User";
import Calcpage from "./generalsystemComponent/Calculationpage/Calcpage";
import Constcalc from "./generalsystemComponent/ConstCalc/Constcalc";
import FlatClaculator from "./generalsystemComponent/Flatcalc/FlatClaculator";
import UserDashboard from "./UserItems/UserDashboard/UserDashboard";
import DeveloperDashboard from "./DevelopersItems/DevDash/DeveloperDashboard";
import SupplierDashboard from "./SupplierItems/SupplyDash/SupplierDashboard";
import RoleSelector from "./Component/OperatorSelector/RoleSelector";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/User",
        element: <User></User>,
      },
      {
        path: "/Counter",
        element: <Calcpage></Calcpage>,
      },
      {
        path: "/construction",
        element: <Constcalc></Constcalc>,
      },
      {
        path: "/flat",
        element: <FlatClaculator></FlatClaculator>,
      },
      {
        path: "/role",
        element: <RoleSelector></RoleSelector>,
      },
      {
        path: "/User_dash",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "/dev_dash",
        element: <DeveloperDashboard></DeveloperDashboard>,
      },
      {
        path: "/supply_dash",
        element: <SupplierDashboard></SupplierDashboard>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
