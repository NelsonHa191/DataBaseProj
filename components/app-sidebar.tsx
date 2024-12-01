"use client";

import * as React from "react";
import {
  Command,
  LayoutDashboard,
  ArrowRightLeft,
  History,
  CreditCard,
  Eclipse,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { userInfoProps } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar({
  userInfo,
  ...props
}: { userInfo: userInfoProps } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const data = {
    user: {
      name: userInfo.username,
      email: userInfo.email,
      avatar: "",
    },

    navMain: [
      {
        title: "Navigation",
        url: "",
        items: [
          {
            title: "Dashboard",
            url: "dashboard",
            icon: LayoutDashboard,
          },
          {
            title: "Transactions",
            url: "transactions",
            icon: History,
          },
          {
            title: "Transfer money",
            url: "transfer-money",
            icon: ArrowRightLeft,
          },
          {
            title: "Accounts",
            url: "accounts",
            icon: CreditCard,
          },
        ],
      },
    ],
  };
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-6 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Eclipse className="size-6 text-sidebar-primary" strokeWidth={2.5}/>
                </div>
                <div className="flex-1 text-left text-sm leading-tight">
                  <span className="truncate tracking-tighter text-lg">Nova</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname.includes(`${item.url}`)}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
