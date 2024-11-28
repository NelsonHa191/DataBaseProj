import AnimatedCounter from "@/components/AnimatedCounter";
import { BankChart } from "@/components/BankChart";
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
  const { data: account, error } = await supabase
    .from("accounts")
    .select()
    .eq("user_id", user.id)
    .single();

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70">
            <h1 className="text-black/80 leading-none tracking-tight">
              Total balance
            </h1>
            <AnimatedCounter balance={account.balance} />
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70">
            <h1 className="text-black/80 leading-none tracking-tight">
              Cashflow
            </h1>
          </div>
          <div className="aspect-video rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70">
            <h1 className="text-black/80 leading-none tracking-tight">
              Your cards
            </h1>
          </div>
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min shadow outline outline-muted/70">
          <BankChart />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min px-6 py-5 sm:py-6 shadow outline outline-muted/70">
          <h1 className="text-black/80 leading-none tracking-tight">
            Recent transactions
          </h1>
        </div>
      </div>
    </>
  );
}
