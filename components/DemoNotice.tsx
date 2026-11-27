"use client";

import { useState } from "react";
import { Info, X } from "lucide-react";

const LEGACY_URL =
  "https://github.com/NelsonHa191/DataBaseProj/tree/main/legacy-supabase";

export default function DemoNotice({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  const styles =
    variant === "dark"
      ? "bg-amber-500/10 text-amber-200 border-amber-500/30"
      : "bg-amber-50 text-amber-900 border-amber-200";

  return (
    <div className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${styles}`}>
      <Info className="mt-0.5 size-4 shrink-0" />
      <p className="flex-1">
        <strong>This is a demo.</strong> The original Supabase database has been
        shut down, so you&apos;re signed in automatically and everything you see
        is sample data. Nothing is saved, and refreshing resets it. The original
        database code is still in the{" "}
        <a href={LEGACY_URL} target="_blank" rel="noreferrer" className="underline font-medium">
          legacy-supabase
        </a>{" "}
        folder if it&apos;s ever needed.
      </p>
      <button onClick={() => setHidden(true)} aria-label="Dismiss" className="opacity-60 hover:opacity-100">
        <X className="size-4" />
      </button>
    </div>
  );
}
