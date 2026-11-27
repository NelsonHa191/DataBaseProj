"use client";

import React, { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import { Account, BalanceLog, Transaction } from "@/types";
import { DEMO_USER_ID, DemoPeer, demoUser, generateDemoData } from "@/lib/demo-data";

type DemoContextValue = {
  user: typeof demoUser;
  accounts: Account[];
  logs: BalanceLog[];
  peers: DemoPeer[];
  transactions: Transaction[];
  connectBank: (input: { institution: string; routing: string; type: string }) => Account;
  transfer: (fromAccountId: number, toRouting: string, amount: number) => { error?: string };
  reset: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

const round2 = (n: number) => Math.round(n * 100) / 100;
const noopSubscribe = () => () => {};

/**
 * Holds all app data in memory for the demo. Changes last for the browser
 * session only — a page refresh resets everything back to the seed data.
 */
export function DemoProvider({ children }: { children: React.ReactNode }) {
  // Generated on the client only, so dates match the visitor's timezone
  // and there's no server/client hydration mismatch.
  const [state, setState] = useState(generateDemoData);
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true, // client
    () => false // server: render the loading state only
  );

  const transactions = useMemo<Transaction[]>(() => {
    const byId = new Map(state.accounts.map((a) => [a.id, a]));
    return state.logs
      .filter((l) => byId.has(l.account_id))
      .map((l) => {
        const acc = byId.get(l.account_id)!;
        return {
          ...l,
          accounts: { institution: acc.institution, routing: acc.routing, user_id: acc.user_id },
        };
      })
      .sort((a, b) => b.created_at.localeCompare(a.created_at));
  }, [state.accounts, state.logs]);

  const connectBank: DemoContextValue["connectBank"] = useCallback(
    ({ institution, routing, type }) => {
      const now = new Date().toISOString();
      const balance = round2(Math.random() * 10000);
      const id = Math.max(0, ...state.accounts.map((a) => a.id)) + 1;
      const account: Account = { id, user_id: DEMO_USER_ID, created_at: now, institution, routing, type, balance };
      setState((s) => ({
        ...s,
        accounts: [...s.accounts, account],
        logs: [...s.logs, { account_id: id, created_at: now, old_balance: null, new_balance: balance }],
      }));
      return account;
    },
    [state.accounts]
  );

  const transfer: DemoContextValue["transfer"] = useCallback(
    (fromAccountId, toRouting, amount) => {
      const from = state.accounts.find((a) => a.id === fromAccountId);
      if (!from) return { error: "Invalid 'from' account." };
      if (!(amount > 0)) return { error: "Enter an amount greater than $0." };
      if (from.balance < amount) return { error: "Insufficient funds in your account." };

      const ownTarget = state.accounts.find((a) => a.routing === toRouting.trim());
      const peerTarget = state.peers.find((p) => p.accounts.some((a) => a.routing === toRouting.trim()));
      if (!ownTarget && !peerTarget) return { error: "Invalid recipient account." };
      if (ownTarget?.id === from.id) return { error: "You can't transfer to the same account." };

      const now = new Date().toISOString();
      setState((s) => {
        const newLogs: BalanceLog[] = [];
        const accounts = s.accounts.map((a) => {
          if (a.id === from.id) {
            const nb = round2(a.balance - amount);
            newLogs.push({ account_id: a.id, created_at: now, old_balance: a.balance, new_balance: nb });
            return { ...a, balance: nb };
          }
          if (ownTarget && a.id === ownTarget.id) {
            const nb = round2(a.balance + amount);
            newLogs.push({ account_id: a.id, created_at: now, old_balance: a.balance, new_balance: nb });
            return { ...a, balance: nb };
          }
          return a;
        });
        const peers = peerTarget
          ? s.peers.map((p) =>
              p === peerTarget
                ? { ...p, netGainLoss: round2(p.netGainLoss + amount), transactions: p.transactions + 1 }
                : p
            )
          : s.peers;
        return { accounts, logs: [...s.logs, ...newLogs], peers };
      });
      return {};
    },
    [state.accounts, state.peers]
  );

  const reset = useCallback(() => setState(generateDemoData()), []);

  return (
    <DemoContext.Provider
      value={{ user: demoUser, ...state, transactions, connectBank, transfer, reset }}
    >
      {ready ? (
        children
      ) : (
        <div className="flex h-screen w-full items-center justify-center text-sm text-muted-foreground">
          Loading demo…
        </div>
      )}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside <DemoProvider>");
  return ctx;
}
