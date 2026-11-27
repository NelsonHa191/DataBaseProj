import { Account, BalanceLog, userInfoProps } from "@/types";

// Everything in this file is fake, generated demo data. Nothing is persisted.

export const DEMO_USER_ID = "demo-user";

export const demoUser: userInfoProps = {
  username: "demo_user",
  email: "demo@nova.app",
  first_name: "Demo",
  last_name: "User",
};

export type DemoPeer = {
  username: string;
  accounts: { routing: string; institution: string; type: string }[];
  netGainLoss: number;
  transactions: number;
};

// Small seeded PRNG so server and client render identical data (no hydration mismatch).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

const DAY = 24 * 60 * 60 * 1000;

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

const seedAccounts: Omit<Account, "balance" | "created_at" | "user_id">[] = [
  { id: 1, institution: "Chase", type: "Checking", routing: "021000021" },
  { id: 2, institution: "Wells Fargo", type: "Savings", routing: "121000248" },
  { id: 3, institution: "Bank of America", type: "Checking", routing: "026009593" },
];

export function generateDemoData() {
  const rand = mulberry32(191);
  const today = startOfToday();
  const accounts: Account[] = [];
  const logs: BalanceLog[] = [];

  for (const base of seedAccounts) {
    const isSavings = base.type === "Savings";
    const opened = today - 100 * DAY;
    let balance = round2(isSavings ? 6000 + rand() * 4000 : 1500 + rand() * 2500);

    logs.push({
      account_id: base.id,
      created_at: new Date(opened + 10 * 60 * 60 * 1000).toISOString(),
      old_balance: null,
      new_balance: balance,
    });

    let t = opened + DAY;
    while (t < today) {
      // a transaction every 1-4 days, at a random hour
      t += Math.floor(1 + rand() * 3.5) * DAY;
      const when = t + Math.floor(8 + rand() * 12) * 60 * 60 * 1000;
      if (when > Date.now()) break;

      let change: number;
      if (isSavings) {
        change = rand() < 0.75 ? 50 + rand() * 400 : -(100 + rand() * 600);
      } else if (rand() < 0.3) {
        change = 400 + rand() * 1400; // paycheck / deposit
      } else {
        change = -(10 + rand() * 260); // spending
      }
      change = round2(change);
      if (balance + change < 50) change = round2(200 + rand() * 500);

      const old = balance;
      balance = round2(balance + change);
      logs.push({
        account_id: base.id,
        created_at: new Date(when).toISOString(),
        old_balance: old,
        new_balance: balance,
      });
    }

    accounts.push({
      ...base,
      user_id: DEMO_USER_ID,
      created_at: new Date(opened).toISOString(),
      balance,
    });
  }

  const peers: DemoPeer[] = [
    { username: "stacks_on_stacks", institution: "Capital One", routing: "056073502" },
    { username: "penny_pincher", institution: "Citi", routing: "021000089" },
    { username: "budget_boss", institution: "US Bank", routing: "091000022" },
    { username: "coinflip", institution: "PNC", routing: "043000096" },
    { username: "savvy_saver", institution: "TD Bank", routing: "031101266" },
    { username: "big_spender", institution: "Ally", routing: "124003116" },
  ].map((p) => ({
    username: p.username,
    accounts: [{ routing: p.routing, institution: p.institution, type: "Checking" }],
    netGainLoss: round2(8000 + rand() * 60000),
    transactions: Math.floor(20 + rand() * 120),
  }));

  return { accounts, logs, peers };
}
