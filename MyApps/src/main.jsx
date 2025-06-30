import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Component/Root/Root";
import Home from "./Component/Home/Home";
import LoginWithNavbar from "./Usersystem/Userlogin/Login";
import RoleSelector from "./Component/OperatorSelector/RoleSelector";
import UserReg from "./Usersystem/UserReg/UserReg";
import UserDashboard from "./Usersystem/UserLoggedsystem/Dashboard/MainDash/UserDashboard";
import CreateUserconnection from "./Usersystem/UserConncetions/CreateUserconnection";
import DeveloperDashboard from "./OnlyDev/dashboard/DevDash/DeveloperDashboard";
import Devlogin from "./OnlyDev/Devlogin/Devlogin";
import DevRegister from "./OnlyDev/Devlogin/DevReg";


// import Login from "./loginsystem/Apps/Frontend/Login";

// import DevLogin from "./loginsystem/Devlogin/Frontend/DevLogin";
// import Dev_reg from "./loginsystem/Devlogin/Dev_Reg/Dev_reg";
import Projectlist from "./Component/Project list/Projectlist";
import JobTaskSchedulingPage from "./OnlyDev/DevelopersConsole/DevelopersMain";
import Calcpage from "./Component/generalsystemComponent/Calculationpage/Calcpage";
import Constcalc from "./Component/generalsystemComponent/ConstCalc/Constcalc";
import FlatClaculator from "./Component/generalsystemComponent/Flatcalc/FlatClaculator";
import WorkerManager from "./Component/Workers Manager/workermanager";
import Doodles from "./OnlyDev/Doodlespage/Doodle";
import Dashboard from "./Pages/Dashboard";
import Developers from "./Pages/Dev";
import FinancePage from "./Pages/Fin";
import ConstructionManager from "./Pages/Propertymanager";
import RajukDetails from "./Pages/Rajuk";
import TaskManager from "./Usersystem/Taskmanager/Taskmanager";

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
        path: "/role",
        element: <RoleSelector></RoleSelector>,
      },
      {
        path: "/Uselogin", 
        element:<LoginWithNavbar></LoginWithNavbar>
      }, 
      {
        path: "/register",
        element: <UserReg></UserReg>
      },
      //all users system 
      {
        path:"user_dash", 
        element: <UserDashboard></UserDashboard>
      },
      {
        path:"/userConnection", 
        element: <CreateUserconnection></CreateUserconnection>
      }, 
      {
        path:"/Counter", 
        element: <Calcpage></Calcpage>

      },


      //Developer 

      {
        path:'/dev_login' , 
        element: <Devlogin></Devlogin>


      },

      {
        path:"/devreg" ,
        element: <DevRegister></DevRegister>
      },

      {
        path:"/DevDash", 
        element:<DeveloperDashboard></DeveloperDashboard>

      },

      // {
      //   path: "/login",
      //   element: <Login></Login>
      // },
      // {
      //   path: "/User",
      //   element: <User></User>,
      // },
      {
        path: "/Counter",
        element:<Calcpage></Calcpage>
      },
      {
        path: "/construction",
        element: <Constcalc></Constcalc>
      },
      {
        path: "/flat",
        element:<FlatClaculator></FlatClaculator>
      },
   
      // {
      //   path: "/User_dash",
      //   element: <UserDashboard></UserDashboard>,
      // },
      // {
      //   path: "/dev_dash",
      //   element: <DeveloperDashboard></DeveloperDashboard>,
      // },
      // {
      //   path: "/supply_dash",
      //   element: <SupplierDashboard></SupplierDashboard>,
      // },
      // {
     
      // {
      //   path:"/dev_login",
      //  element: <DevLogin></DevLogin>
      // }, 
      // {
      //   path:"/dev_reg",
      //   element:<Dev_reg></Dev_reg>
      // }, 
      {
        path: "/projectlist",
        element:<Projectlist></Projectlist>
      },
      {
        path:"/jobtask" , 
        element:<JobTaskSchedulingPage></JobTaskSchedulingPage>
      }, 
      {
        path:"workers",
        element:<WorkerManager></WorkerManager>
      },
      {
        path:"/doodles",
        element:<Doodles></Doodles>
      },
      {
        path:"/dashpage",
        element:<Dashboard></Dashboard>
      },
      {
        path:"/devpage" ,
        element:<Developers></Developers>
      },
      {
        path:"/Finpage" ,
        element:<FinancePage></FinancePage>
      },
      {
        path: "/propertypage" ,
        element: <ConstructionManager></ConstructionManager>
      },
      {
        path: "rajukpage" ,
        element: <RajukDetails></RajukDetails>
      },
      {
        path:"/tasks",
        element:<TaskManager></TaskManager>
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
