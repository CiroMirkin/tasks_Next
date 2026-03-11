"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Clipboard, Home, Store, User2Icon } from "lucide-react"
import { usePathname } from "next/navigation"

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Home",
          url: "/",
          icon: <Home />,
        },
        {
          title: "Tasks Admin",
          url: "/dashboard",
          icon: <Clipboard />,
        },
        {
          title: "Products",
          url: "/products",
          icon: <Store />,
        },
         {
          title: "Profile",
          url: "/profile",
          icon: <User2Icon />,
        },
      ],
    },
  ]
}
export default function SidebarContentList() {
    const pathname = usePathname()
    return data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      render={<a href={item.url} />}
                    >
                      {item.icon}
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))
}