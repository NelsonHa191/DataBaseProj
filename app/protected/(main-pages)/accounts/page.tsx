import React from "react";
import ConnectBankDialog from "@/components/ConnectBankDialog";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Account } from "@/types";
import AccountCard from "@/components/AccountCard";

export default async function Accounts() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const { data: account, error } = await supabase.rpc("fetch_user_accounts", {
    u_id: user.id,
  });

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 lg:grid-cols-3 grid-cols-1">
          {account?.map((acc: Account) => (
            <AccountCard acc={acc} key={acc.id}/>
          ))}
          <div className="min-h-[300px] space-y-2 flex justify-center items-center flex-col rounded-xl bg-transparent shadow outline outline-muted/70">
            <h1 className="text-black/80 leading-none tracking-tight">
              Add an account
            </h1>
            <div className="">
              <ConnectBankDialog />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
