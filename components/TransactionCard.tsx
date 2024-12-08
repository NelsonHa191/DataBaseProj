import React from "react";
import { BalanceLog, Account } from "@/types";

interface TransactionCardProps {
  tx: BalanceLog;
  accounts: Account[];
}

export default function TransactionCard({
  tx,
  accounts,
}: TransactionCardProps) {
  const account = accounts.find((a) => a.id === tx.account_id);

  return (
    <div className="aspect-video space-y-2 flex justify-center items-center flex-col rounded-xl bg-transparent shadow outline outline-muted/70">
      <h2 className="text-black/80 leading-none tracking-tight">
        {account?.institution} - {account?.type}
      </h2>
      <p className="text-black/60">Old Balance: ${tx.old_balance.toFixed(2)}</p>
      <p className="text-black/60">New Balance: ${tx.new_balance.toFixed(2)}</p>
      <p className="text-black/60">
        Date: {new Date(tx.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
