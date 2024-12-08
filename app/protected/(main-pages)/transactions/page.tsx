import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TransactionHistory from "@/components/TransactionHistory";
import { Transaction } from "@/types";

export default async function TransactionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const { data: transactions, error } = await supabase
    .from("balance_log")
    .select(
      `
      account_id,
      created_at,
      old_balance,
      new_balance,
      accounts!inner (
        institution,
        routing,
        user_id
      )
    `
    )
    .eq("accounts.user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
    return <div>Error loading transactions</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <div className="rounded-xl bg-muted/50 lg:min-h-min px-6 py-5 sm:py-6 shadow outline outline-muted/70">
        <TransactionHistory
          initialTransactions={transactions as Transaction[]}
          userId={user.id}
        />
      </div>
    </div>
  );
}
