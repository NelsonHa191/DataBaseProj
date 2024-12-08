import { createClient } from "@/utils/supabase/server";
import LeaderboardTable from "@/components/LeaderboardTable";
import { LeaderboardUser } from "@/types";

export default async function Leaderboard() {
  const supabase = await createClient();

  const { data: leaderboardData, error } = await fetchLeaderboardData(supabase);

  if (error) {
    return <div>Error fetching leaderboard data: {error.message}</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <div className="rounded-xl bg-muted/50 lg:min-h-min px-6 py-5 sm:py-6 shadow outline outline-muted/70">
        <LeaderboardTable data={leaderboardData} />
      </div>
    </div>
  );
}

async function fetchLeaderboardData(supabase) {
  const { data, error } = await fetchLeaderboardDataAction(supabase);
  return { data, error };
}

async function fetchLeaderboardDataAction(supabase) {
  try {
    // 1. Fetch user profiles
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, username");
    if (profilesError) {
      console.error("Error fetching profiles:", profilesError);
      return { error: profilesError };
    }

    // 2. Fetch accounts for each user
    const userAccounts = await Promise.all(
      profiles.map(async (profile) => {
        const { data: accounts, error: accountsError } = await supabase
          .from("accounts")
          .select("id, user_id, balance")
          .eq("user_id", profile.id);
        if (accountsError) {
          console.error(
            `Error fetching accounts for user ${profile.username}:`,
            accountsError
          );
          return null;
        }
        return { username: profile.username, accounts };
      })
    );

    // 3. Fetch balance log for each account and calculate net gain/loss and transaction count
    const leaderboardData: LeaderboardUser[] = await Promise.all(
      userAccounts.map(async (userAccount) => {
        if (!userAccount) return null;
        const { username, accounts } = userAccount;

        const accountBalanceLogs = await Promise.all(
          accounts.map(async (account) => {
            const { data: balanceLogs, error: balanceLogsError } =
              await supabase
                .from("balance_log")
                .select("created_at, old_balance, new_balance")
                .eq("account_id", account.id)
                .order("created_at", { ascending: true });
            if (balanceLogsError) {
              console.error(
                `Error fetching balance logs for account ${account.id}:`,
                balanceLogsError
              );
              return null;
            }
            return balanceLogs;
          })
        );

        // Calculate total net gain/loss
        const totalNetGainLoss = accountBalanceLogs.reduce((total, logs) => {
          if (!logs) return total;

          // Sum up the gain/loss for each transaction
          const netGainLossForAccount = logs.reduce((sum, log) => {
            const oldBalance = log.old_balance ?? 0; // Default to 0 if null
            const newBalance = log.new_balance;
            const gainLoss = newBalance - oldBalance;

            // console.log(
            //   `For user ${username}, transaction: newBalance=${newBalance}, oldBalance=${oldBalance}, gain/loss=${gainLoss}`
            // ); // Debug log

            return sum + gainLoss;
          }, 0);

          return total + netGainLossForAccount;
        }, 0);

        // Count the total number of transactions
        const totalTransactions = accountBalanceLogs.reduce((count, logs) => {
          if (logs) {
            count += logs.length; // Count the number of balance log entries
          }
          return count;
        }, 0);

        // console.log(
        //   `Final total gain/loss for user ${username}: ${totalNetGainLoss}`
        // ); // Debug log
        // console.log(
        //   `Total transactions for user ${username}: ${totalTransactions}`
        // ); // Debug log

        return { username, totalNetGainLoss, totalTransactions };
      })
    );

    // 4. Sort the leaderboard data by totalNetGainLoss
    const sortedLeaderboardData = leaderboardData
      .filter(Boolean)
      .sort((a, b) => b.totalNetGainLoss - a.totalNetGainLoss);

    // console.log("Leaderboard data before sorting:", leaderboardData); // Debug log
    // console.log("Sorted leaderboard data:", sortedLeaderboardData); // Debug log

    return { data: sortedLeaderboardData, error: null };
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return { error };
  }
}
