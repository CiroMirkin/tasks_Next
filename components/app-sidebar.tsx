import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import User from "./user"
import LogoutAndSignInButton from "./LogoutAndSignInButton"
import SidebarContentList from "./sidebarContent"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="">
        <User />
      </SidebarHeader>
      <SidebarContent className="justify-between">
        <SidebarContentList />
        <SidebarFooter>
          <LogoutAndSignInButton />
        </SidebarFooter>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
