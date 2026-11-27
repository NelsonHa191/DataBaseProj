"use client";

import ConnectBankDialog from "@/components/ConnectBankDialog";
import AccountCard from "@/components/AccountCard";
import { useDemo } from "@/components/DemoProvider";

export default function Accounts() {
  const { accounts } = useDemo();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
        {accounts.map((acc) => (
          <AccountCard acc={acc} key={acc.id} />
        ))}
        <div className="min-h-[300px] space-y-2 flex justify-center items-center flex-col rounded-xl bg-transparent shadow outline outline-muted/70">
          <h1 className="text-black/80 leading-none tracking-tight">Add an account</h1>
          <ConnectBankDialog />
        </div>
      </div>
    </div>
  );
}
