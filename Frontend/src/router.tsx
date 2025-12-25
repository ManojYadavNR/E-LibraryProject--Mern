import { createBrowserRouter } from "react-router-dom";
import Register from "@/pages/Register";
import  Login from "@/pages/login";
// import HomePage from "@/pages/HomePage";
import HomePage from "./pages/HomePage";
import AuthLayout from "./layouts/authLayout";
import  Layout from "./layouts/layout";
import  Books from "./pages/Books";
export const router = createBrowserRouter([
  {
      path: "/dashboard",
    element: <Layout/>, 
    children: [
      { path: "home", element: <HomePage /> }, 
      {
    path: "books",
    element:<Books/>,
  }
      
    ]},
       {
       path: "/auth",
    element:<AuthLayout/>,
    children:[{
          path: "login",
    element:<Login/>,
    }, {
    path: "register",
    element:<Register/>,
  }]
    
  },
  
  
    {
    path: "/re",
    element:<Layout/>,
  },
]);