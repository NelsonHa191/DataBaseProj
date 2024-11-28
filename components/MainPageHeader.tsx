"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { usePathname } from "next/navigation";

export default function MainPageHeader({ first_name }: { first_name: string }) {
  const pathname = usePathname();

  switch (pathname) {
    case "/protected/transactions":
      return (
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            Transactions
          </div>
        </header>
      );
    case "/protected/transfer-money":
      return (
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            Transfer money
          </div>
        </header>
      );
    case "/protected/connect-bank":
      return (
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            Connect bank
          </div>
        </header>
      );
    default:
      return (
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            Welcome back, {first_name}
          </div>
        </header>
      );
  }
}