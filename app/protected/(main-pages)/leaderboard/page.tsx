"use client";

import LeaderboardTable from "@/components/LeaderboardTable";
import { useDemo } from "@/components/DemoProvider";
import { LeaderboardUser } from "@/types";

export default function Leaderboard() {
  const { user, logs, peers } = useDemo();

  // Your net gain/loss = sum of every balance change across your accounts
  const yourNet = logs.reduce((sum, l) => sum + (l.new_balance - (l.old_balance ?? 0)), 0);

  const data: LeaderboardUser[] = [
    { username: user.username, totalNetGainLoss: yourNet, isYou: true },
    ...peers.map((p) => ({ username: p.username, totalNetGainLoss: p.netGainLoss })),
  ].sort((a, b) => b.totalNetGainLoss - a.totalNetGainLoss);

  return (
    <div className="flex flex-col gap-4 p-4 pt-0">
      <div className="rounded-xl bg-muted/50 lg:min-h-min px-6 py-5 sm:py-6 shadow outline outline-muted/70">
        <LeaderboardTable data={data} />
      </div>
    </div>
  );
}
