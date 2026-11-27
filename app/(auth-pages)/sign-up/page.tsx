import { redirect } from "next/navigation";

// Demo mode: there's no real auth anymore, so go straight to the dashboard.
export default function Page() {
  redirect("/protected/dashboard");
}
