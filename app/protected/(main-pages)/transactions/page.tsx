import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TransactionHistory from "@/components/TransactionHistory";

interface Transaction {
  account_id: string;
  created_at: string;
  old_balance: number | null;
  new_balance: number;
  accounts: {
    institution: string;
    routing: string;
    user_id: string;
  };
}

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
    <div className="flex flex-1 flex-col gap-4 p-4">
      <TransactionHistory
        initialTransactions={transactions as Transaction[]}
        userId={user.id}
      />
    </div>
  );
}
