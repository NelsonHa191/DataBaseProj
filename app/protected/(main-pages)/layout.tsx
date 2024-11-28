import { AppSidebar } from "@/components/app-sidebar";
import MainPageHeader from "@/components/MainPageHeader";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const userInfo = {
    first_name: user.user_metadata.first_name,
    last_name: user.user_metadata.last_name,
    email: user.email!,
    username: user.user_metadata.username,
  };


  return (
    <SidebarProvider>
      <AppSidebar userInfo={userInfo} />
      <SidebarInset>
        <MainPageHeader first_name={userInfo.first_name} />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
