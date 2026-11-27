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

  if (error) {
    console.error("Failed to fetch accounts:", error.message);
    return (
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="rounded-xl bg-muted/50 p-4 text-black/80">
          Failed to load account information. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid gap-4 lg:grid-cols-3 grid-cols-1">
        {accounts?.map((acc: Account) => (
          <div
            key={acc.id}
            className="flex flex-col min-h-[170px] rounded-xl bg-muted/100 px-6 py-5 sm:py-6 shadow outline outline-muted/70 text-black/80"
          >
            <div className="flex justify-between items-center">
              <div>
                <h1 className="tracking-tight text-xl">{acc.institution}</h1>
                <p className="text-sm text-muted-foreground">
                  {acc.type} Account
                </p>
              </div>
              <div className="text-right text-lg">
                <p className="">${acc.balance.toFixed(2)}</p>
              </div>
            </div>
            <TransferMoneyDialog fromAccount={acc} accounts={accounts} />
          </div>
        ))}
      </div>
    </div>
  );
}
