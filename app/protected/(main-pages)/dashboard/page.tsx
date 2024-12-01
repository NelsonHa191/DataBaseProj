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


  // Turn this into a sql query to get the total balance
  const { data: account, error } = await supabase
    .from("accounts")
    .select()
    .eq("user_id", user.id)
    .order("created_at");

  const totalBalance = account
    ? account.reduce((acc, curr) => acc + curr.balance, 0)
    : 0.00;


  // Turn this into a sql query to get all the user's balance logs (join accounts and balance_log)
  let balance_log = null;
  if (account) {
    const { data, error } = await supabase
      .from("balance_log")
      .select()
      .eq("account_id", account[0].id)
      .order("created_at")
    balance_log = data;
  }


 const chartData = balance_log ? balance_log.map((log) => {
    return {
      date: log.created_at.slice(0, 10),
      balance: log.new_balance,
    };
  }) : [];


  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70 md:col-span-2">
            <h1 className="text-black/80 leading-none tracking-tight">
              Total balance
            </h1>
            <AnimatedCounter balance={totalBalance} />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70">
            <h1 className="text-black/80 leading-none tracking-tight">
              Cashflow
            </h1>
          </div>
        </div>
        <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min shadow outline outline-muted/70">
          <BalanceActivityChart chartData={chartData}/>
        </div>
        <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min px-6 py-5 sm:py-6 shadow outline outline-muted/70">
          <h1 className="text-black/80 leading-none tracking-tight">
            Recent transactions
          </h1>
        </div>
      </div>
    </>
  );
}
