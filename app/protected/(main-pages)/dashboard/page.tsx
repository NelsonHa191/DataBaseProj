import AnimatedCounter from "@/components/AnimatedCounter";
import { BalanceActivityChart } from "@/components/BalanceActivityChart";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  // fetches total balance of all accounts
  const { data: totalBalance, error: totalBalanceError } = await supabase.rpc(
    "fetch_total_balance",
    { u_id: user.id }
  );

  // fetches last month's total balance
  const { data: lastMonthBalance, error: lastMonthBalanceError } =
    await supabase.rpc("fetch_last_month", { u_id: user.id });

  // fetches this month's incoming money
  const { data: moneyIn, error: moneyInError } = await supabase.rpc(
    "fetch_money_in",
    { u_id: user.id }
  );
  let totalMoneyIn = 0;
  for (let i = 0; i < moneyIn.length; i++) {
    totalMoneyIn += parseFloat(
      (moneyIn[i].new_balance - moneyIn[i].old_balance).toFixed(2)
    );
  }

  const { data: moneyOut, error: moneyOutError } = await supabase.rpc(
    "fetch_money_out",
    { u_id: user.id }
  );
  let totalMoneyOut = 0;
  for (let i = 0; i < moneyOut.length; i++) {
    totalMoneyOut += Math.abs(
      parseFloat((moneyOut[i].new_balance - moneyOut[i].old_balance).toFixed(2))
    );
  }

  // fetches user's accounts' balance logs over the last 3 months
  const { data: balanceLogs, error: balanceLogsError } = await supabase.rpc("fetch_balance_logs", { u_id: user.id });
  console.log(balanceLogs); 

  const chartData = balanceLogs ? balanceLogs.map((log) => {
    return {
      date: log.created_at.slice(0, 10),
      balance: log.new_balance,
    };
  }) : [];

  // Turn this into a sql query to get all the user's balance logs (join accounts and balance_log)
  //   let balance_log = null;
  //   if (account) {
  //     const { data, error } = await supabase
  //       .from("balance_log")
  //       .select()
  //       .eq("account_id", account[0].id)
  //       .order("created_at")
  //     balance_log = data;
  //   }

  //  const chartData = balance_log ? balance_log.map((log) => {
  //     return {
  //       date: log.created_at.slice(0, 10),
  //       balance: log.new_balance,
  //     };
  //   }) : [];

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
          <div className="flex flex-col rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70 lg:col-span-2 h-full">
            <h1 className="text-black/80 leading-none tracking-tight">
              Total balance
            </h1>
            <AnimatedCounter balance={totalBalance} />
            <h2 className="text-sm text-muted-foreground mt-4">
              Down ${totalBalance - lastMonthBalance[0].new_balance} from last
              month
            </h2>
          </div>
          <div className="flex flex-col h-full  rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70">
            <h1 className="text-black/80 leading-none tracking-tight">
              Cashflow
            </h1>
            <AnimatedCounter balance={totalMoneyIn - totalMoneyOut} />
            <div className="flex flex-col lg:flex-row mt-4 text-sm">
              <p className="">
                ${totalMoneyIn}{" "}
                <span className="text-muted-foreground">in</span>
              </p>
              <p className="lg:ml-auto">
                ${totalMoneyOut}{" "}
                <span className="text-muted-foreground">out</span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 rounded-xl bg-muted/50 lg:min-h-min shadow outline outline-muted/70">
          <BalanceActivityChart chartData={chartData}/>
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
