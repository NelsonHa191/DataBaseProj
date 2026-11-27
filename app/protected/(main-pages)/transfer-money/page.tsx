"use client";

import TransferMoneyDialog from "@/components/TransferMoneyDialog";
import { useDemo } from "@/components/DemoProvider";

export default function TransferPage() {
  const { accounts } = useDemo();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className="flex flex-col min-h-[170px] rounded-xl bg-muted/100 px-6 py-5 sm:py-6 shadow outline outline-muted/70 text-black/80"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="tracking-tight text-xl">{acc.institution}</h1>
                <p className="text-sm text-muted-foreground">{acc.type} Account</p>
              </div>
              <div className="text-right text-lg">
                <p>${acc.balance.toFixed(2)}</p>
              </div>
            </div>
            <TransferMoneyDialog fromAccount={acc} />
          </div>
        ))}
      </div>
    </div>
  );
}
