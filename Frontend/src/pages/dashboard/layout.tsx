
import { AppSidebar } from "@/components/app-sidebar"
// import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"

import { SiteHeader } from "@/components/ui/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Outlet } from "react-router-dom"

// import data from "./data.json"


export default function Layout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      
      <SidebarInset>
        <SiteHeader />
       <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  )
}
