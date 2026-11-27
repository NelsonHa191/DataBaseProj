"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { usePathname } from "next/navigation";
import { RotateCcw } from "lucide-react";
import { useDemo } from "@/components/DemoProvider";

const titles: Record<string, string> = {
  "/protected/transactions": "Transactions",
  "/protected/transfer-money": "Transfer money",
  "/protected/accounts": "Your accounts",
  "/protected/leaderboard": "Leaderboard",
};

export default function MainPageHeader({ first_name }: { first_name: string }) {
  const pathname = usePathname();
  const { reset } = useDemo();
  const title = titles[pathname];

  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        {title ?? `Welcome back, ${first_name}`}
        <div className="ml-auto mr-2 flex items-center gap-3">
          {!title && (
            <p className="text-sm text-muted-foreground max-sm:hidden">
              {new Date().toDateString()}
            </p>
          )}
          <span
            className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs text-amber-800"
            title="Demo mode — nothing you do here is saved. Refresh to reset."
          >
            Demo mode
          </span>
          <button
            onClick={reset}
            className="text-muted-foreground hover:text-foreground"
            title="Reset demo data"
            aria-label="Reset demo data"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
