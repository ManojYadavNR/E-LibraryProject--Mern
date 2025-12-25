import { createBrowserRouter } from "react-router-dom";
import Register from "@/pages/Register";
import  Login from "@/pages/login";
// import HomePage from "@/pages/HomePage";
import Page from "@/pages/dashboard/dashboard";

import  Layout from "./pages/dashboard/layout";
export const router = createBrowserRouter([
  {
      path: "/",
    element: <Layout/>, // Sidebar + Outlet
    children: [
      { path: "home", element: <Page /> }, // Routed content
      // Add more routes here
    ]},
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
    element:<Layout/>,
  },
]);