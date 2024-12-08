// app/protected/transfer-money/page.tsx
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Account } from "@/types";
import TransferMoneyDialog from "@/components/TransferMoneyDialog";

export default async function TransferPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: accounts, error } = await supabase.rpc("fetch_user_accounts", {
    u_id: user.id,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-bold">Transfer Money</h1>
      <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
        {accounts?.map((acc: Account) => (
          <div key={acc.id} className="bg-white shadow rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{acc.institution}</h2>
                <p className="text-sm text-gray-500">{acc.type} Account</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${acc.balance.toFixed(2)}</p>
              </div>
            </div>
            <TransferMoneyDialog fromAccount={acc} accounts={accounts} />
          </div>
        ))}
      </div>
    </div>
  );
}
