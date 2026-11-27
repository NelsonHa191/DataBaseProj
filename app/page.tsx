import { redirect } from "next/navigation";

// The site opens straight onto the demo dashboard.
// The original landing page still lives at /home.
export default function Root() {
  redirect("/protected/dashboard");
}
