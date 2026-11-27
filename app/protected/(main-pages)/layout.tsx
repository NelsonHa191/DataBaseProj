"use client";

import { AppSidebar } from "@/components/app-sidebar";
import MainPageHeader from "@/components/MainPageHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useDemo } from "@/components/DemoProvider";
import DemoNotice from "@/components/DemoNotice";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useDemo();

  return (
    <SidebarProvider>
      <AppSidebar userInfo={user} />
      <SidebarInset className="min-w-0">
        <MainPageHeader first_name={user.first_name} />
        <div className="px-4 pb-4">
          <DemoNotice />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
