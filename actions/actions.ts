"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BalanceLog } from "@/types";

export const getAccountChartAction = async (a_id: number) => {
    const supabase = await createClient();
   
    const { data, error } = await supabase.rpc('fetch_balance_logs', { a_id: a_id });
    let balance_log = data;

   const chartData = balance_log ? balance_log.map((log: BalanceLog) => {
      return {
        date: log.created_at.slice(0, 10),
        balance: log.new_balance,
      };
    }) : [];

    return chartData;
}

export const connectBankAction = async (formData: FormData) => {
    const institution = formData.get("institution") as string;
    const routing = formData.get("routing") as string;
    const type = formData.get("type") as string;
    const balance = parseFloat((Math.random() * 10000).toFixed(2));

    console.log(institution, routing, type, balance);

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log(user);
    if (!user) {
      return redirect("/sign-in");
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
      return encodedRedirect("error", "/protected/onboarding", "Could not connect bank");
    }
  
    return redirect("/protected/dashboard");
};

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const username = formData.get("username")?.toString();
  const first_name = formData.get("first_name")?.toString();
  const last_name = formData.get("last_name")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Email and password are required",
    );
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        username: username,
        first_name: first_name, 
        last_name: last_name, 
      }
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link.",
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/protected/dashboard");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};
