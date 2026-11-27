"use client";

import { BalanceActivityChart } from "@/components/BalanceActivityChart";
import TotalBalance from "@/components/TotalBalance";
import Cashflow from "@/components/Cashflow";
import AccountCarousel from "@/components/AccountCarousel";
import TransactionHistory from "@/components/TransactionHistory";
import { useDemo } from "@/components/DemoProvider";

export default function Dashboard() {
  const { accounts, transactions } = useDemo();

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  // this month's money in / out (excluding initial account balances)
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  let totalMoneyIn = 0;
  let totalMoneyOut = 0;
  for (const t of transactions) {
    if (t.old_balance === null || new Date(t.created_at).getTime() < monthStart) continue;
    const change = t.new_balance - t.old_balance;
    if (change > 0) totalMoneyIn += change;
    else totalMoneyOut += Math.abs(change);
  }
  const cashflow = totalMoneyIn - totalMoneyOut;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
        <TotalBalance totalBalance={totalBalance} cashflow={cashflow} />
        <Cashflow totalMoneyIn={totalMoneyIn} totalMoneyOut={totalMoneyOut} cashflow={cashflow} />
        <AccountCarousel accounts={accounts} />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 lg:min-h-min shadow outline outline-muted/70">
        <BalanceActivityChart accounts={accounts} />
      </div>
      <div className="flex-1 rounded-xl bg-muted/50 lg:min-h-min px-6 py-5 sm:py-6 shadow outline outline-muted/70">
        <h1 className="text-black/80 leading-none tracking-tight">Recent transactions</h1>
        <TransactionHistory initialTransactions={transactions} />
      </div>
    </div>
  );
}
