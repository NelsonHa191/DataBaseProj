"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const connectBankAction = async (formData: FormData) => {
    const institution = formData.get("institution") as string;
    const routing = formData.get("routing") as string;
    const type = formData.get("type") as string;
    const balance = parseFloat((Math.random() * 10000).toFixed(2));

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return redirect("/login");
    }
    
    const { error } = await supabase.from("accounts").insert(
      {
        user_id: user.id,
        institution,
        routing,
        type,
        balance,
      },
    );
  
    if (error) {
      return encodedRedirect("error", "/onboarding", "Could not connect bank");
    }
  
    return redirect("/dashboard");
  }