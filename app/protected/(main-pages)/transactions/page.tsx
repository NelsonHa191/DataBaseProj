"use client";

import TransactionHistory from "@/components/TransactionHistory";
import { useDemo } from "@/components/DemoProvider";

export default function TransactionsPage() {
  const { transactions } = useDemo();

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <div className="rounded-xl bg-muted/50 lg:min-h-min px-6 py-5 sm:py-6 shadow outline outline-muted/70">
        <TransactionHistory initialTransactions={transactions} />
      </div>
    </div>
  );
}
