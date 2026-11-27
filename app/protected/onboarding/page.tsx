import ConnectBankDialog from "@/components/ConnectBankDialog";

export default function Onboarding() {
  return (
    <section className="flex items-center justify-center size-full max-sm:px-6">
      <div className="flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8">
        <h1>Welcome to the Nova demo!</h1>
        <h1>Get started by connecting a (pretend) bank account.</h1>
        <ConnectBankDialog redirectTo="/protected/dashboard" />
      </div>
    </section>
  );
}
