import ConnectBankDialog from "@/components/ConnectBankDialog";
import React from "react";

export default function Onboarding() {
  return (
    <section className="flex items-center justify-center size-full max-sm:px-6">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
        <h1 className="">Thanks for confirming your email!</h1>
        <h1 className="">Get started by connecting your bank account.</h1>
        <ConnectBankDialog />
      </div>
    </section>
  );
}
