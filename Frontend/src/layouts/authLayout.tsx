import TokenStore from "@/AuthStore"
import { Navigate, Outlet } from "react-router-dom"


const AuthLayout = () => {
    const token = TokenStore((state)=>state.token)
   if(token){
    return <Navigate to={"/dashboard/home"} replace /> 
   }
  return (
    <>
    <Outlet/>
    </>
  )
}

export default AuthLayout