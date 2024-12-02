import { BalanceActivityChart } from "@/components/BalanceActivityChart";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TotalBalance from "@/components/TotalBalance";
import Cashflow from "@/components/Cashflow";
import AccountCarousel from "@/components/AccountCarousel";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  // gets total balance of all accounts
  const { data: totalBalance, error: totalBalanceError } = await supabase.rpc(
    "fetch_total_balance",
    { u_id: user.id }
  );

  // gets this month's incoming money
  const { data: moneyIn, error: moneyInError } = await supabase.rpc(
    "fetch_money_in",
    { u_id: user.id }
  );
  let totalMoneyIn = 0.0;
  for (let i = 0; i < moneyIn.length; i++) {
    totalMoneyIn += parseFloat(
      (moneyIn[i].new_balance - moneyIn[i].old_balance).toFixed(2)
    );
  }
  // gets this month's outgoing money
  const { data: moneyOut, error: moneyOutError } = await supabase.rpc(
    "fetch_money_out",
    { u_id: user.id }
  );
  let totalMoneyOut = 0.0;
  for (let i = 0; i < moneyOut.length; i++) {
    totalMoneyOut += Math.abs(
      parseFloat((moneyOut[i].new_balance - moneyOut[i].old_balance).toFixed(2))
    );
  }
  // calculates this months cashflow
  const cashflow = totalMoneyIn - totalMoneyOut;

  // gets user's accounts
  const { data: accounts, error: accountError } = await supabase.rpc(
    "fetch_user_accounts",
    { u_id: user.id }
  );

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
          <TotalBalance totalBalance={totalBalance} cashflow={cashflow} />
          <Cashflow
            totalMoneyIn={totalMoneyIn}
            totalMoneyOut={totalMoneyOut}
            cashflow={cashflow}
          />
          <AccountCarousel accounts={accounts} />
        </div>
        <div className="flex-1 rounded-xl bg-muted/50 lg:min-h-min shadow outline outline-muted/70">
          <BalanceActivityChart accounts={accounts} />
        </div>
        <div className="flex-1 rounded-xl bg-muted/50 lg:min-h-min px-6 py-5 sm:py-6 shadow outline outline-muted/70">
          <h1 className="text-black/80 leading-none tracking-tight">
            Recent transactions
          </h1>
        </div>
      </div>
    </>
  );
}
