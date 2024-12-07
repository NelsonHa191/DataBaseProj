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

export const transferMoneyAction = async (formData: FormData) => {
  const supabase = await createClient();
  const fromAccountId = parseInt(formData.get("from_account_id") as string);
  const toRoutingNumber = formData.get("to_routing_number") as string;
  const amount = parseFloat(formData.get("amount") as string);

  // 1. Validate the user's identity and account ownership
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/sign-in");
  }

  // 2. Retrieve the details of the "from" and "to" accounts
  const { data: fromAccount, error: fromAccountError } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", user.id)
    .eq("id", fromAccountId)
    .single();

  if (fromAccountError || !fromAccount) {
    return { error: "Invalid 'from' account." };
  }

  const { data: toAccount, error: toAccountError } = await supabase
    .from("accounts")
    .select("*")
    .eq("routing", toRoutingNumber)
    .single();

  if (toAccountError || !toAccount) {
    return { error: "Invalid recipient account." };
  }

  // 3. Check if the "from" account has sufficient balance
  if (fromAccount.balance < amount) {
    return { error: "Insufficient funds in your account." };
  }

  // 4. Update the balances of both the "from" and "to" accounts
  const { error: deductError } = await supabase
    .from("accounts")
    .update({ balance: fromAccount.balance - amount })
    .eq("id", fromAccountId);

  if (deductError) {
    return { error: "Failed to deduct money from your account." };
  }

  const { error: addError } = await supabase
    .from("accounts")
    .update({ balance: toAccount.balance + amount })
    .eq("id", toAccount.id);

  if (addError) {
    return { error: "Failed to add money to the recipient account." };
  }

  // 5. Log the transaction for auditing purposes (optional)
  await supabase.from("transactions").insert({
    from_account_id: fromAccountId,
    to_account_id: toAccount.id,
    amount: amount,
    timestamp: new Date().toISOString(),
  });

  // Return a success response or redirect after successful transfer
  return redirect("/protected/dashboard");
};

export const fetchBalanceLogs = async (accountIds: number[]) => {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('fetch_balance_logs', { a_id: accountIds });
  return { data, error };
};

export const filterTransactions = async (
  userId: string,
  institution: string,
  dateRange: string
) => {
  const supabase = await createClient();
  
  let query = supabase
    .from('balance_log')
    .select(`
      account_id,
      created_at,
      old_balance,
      new_balance,
      accounts!inner (
        institution,
        routing,
        user_id
      )
    `)
    .eq('accounts.user_id', userId)
    .order('created_at', { ascending: false });

  // Add institution filter if selected
  if (institution) {
    query = query.eq('accounts.institution', institution);
  }

  // Add date range filter if selected
  if (dateRange) {
    const days = parseInt(dateRange);
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);
    query = query.gte('created_at', fromDate.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error filtering transactions:', error);
    return { error };
  }

  return { data };

  
};