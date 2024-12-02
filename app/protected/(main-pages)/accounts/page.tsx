import React from "react";
import ConnectBankDialog from "@/components/ConnectBankDialog";
import AnimatedCounter from "@/components/AnimatedCounter";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Account } from "@/types";

export default async function Accounts() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const { data: account, error } = await supabase.rpc('fetch_user_accounts', { u_id: user.id });

  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            {account?.map((acc: Account) => (
            <div key={acc.id} className="aspect-video rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70 text-black/80">
              <h1 className=" leading-none tracking-tight">
              {acc.institution}
              </h1>
              <p>{acc.type}</p>
              <p>{acc.routing}</p>
              <p className="mt-4 text-2xl lg:text-4xl xl:text-5xl">
              ${acc.balance}
              </p>
            </div>
            ))}
          <div className="aspect-video space-y-2 flex justify-center items-center flex-col rounded-xl bg-transparent shadow outline outline-muted/70">
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
