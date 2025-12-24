import { createBrowserRouter } from "react-router-dom";
import Register from "@/pages/Register";
import  Login from "@/pages/login";
import HomePage from "@/pages/HomePage";
import Page from "@/pages/dashboard/dashboard";
export const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path: "/login",
    element:<Login/>,
  },
   {
    path: "/register",
    element:<Register/>,
  },
    {
    path: "/re",
    element:<Page/>,
  },
]);