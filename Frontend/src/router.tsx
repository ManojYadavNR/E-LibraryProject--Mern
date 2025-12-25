import { createBrowserRouter } from "react-router-dom";
import Register from "@/pages/Register";
import  Login from "@/pages/login";
// import HomePage from "@/pages/HomePage";
import HomePage from "./pages/HomePage";

import  Layout from "./pages/layout";
import  Books from "./pages/Books";
export const router = createBrowserRouter([
  {
      path: "/",
    element: <Layout/>, // Sidebar + Outlet
    children: [
      { path: "home", element: <HomePage /> }, 
      {
    path: "books",
    element:<Books/>,
  }
      
    ]},
       {
    path: "login",
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