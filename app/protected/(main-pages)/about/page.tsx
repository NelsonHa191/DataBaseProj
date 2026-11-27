import Link from "next/link";
import {
  Trophy,
  GraduationCap,
  Database,
  Layers,
  Sparkles,
  FolderGit2,
  ArrowRight,
  Github,
} from "lucide-react";

const REPO_URL = "https://github.com/NelsonHa191/DataBaseProj";

const authors = [
  { name: "Nelson", github: "NelsonHa191" },
  { name: "Ryan", github: "ryanside" },
];

const features = [
  {
    title: "Dashboard",
    body: "Total balance across every account, this month's cash flow, an account carousel and recent activity, all in one place.",
  },
  {
    title: "Balance activity chart",
    body: "A three-month balance history for each account, built from a log of every balance change.",
  },
  {
    title: "Transaction history",
    body: "Every deposit and withdrawal, filterable by bank and by date range (7, 30 or 90 days).",
  },
  {
    title: "Money transfers",
    body: "Send money between your own accounts or to another user by routing number, with balance checks.",
  },
  {
    title: "Connect accounts",
    body: "Link a (pretend!) bank account by routing number, institution and account type.",
  },
  {
    title: "Leaderboard",
    body: "Ranks every user by total net gain or loss across all their accounts, showing only usernames to keep everything else private.",
  },
];

const tables = [
  {
    name: "profiles",
    note: "One row per user, linked to Supabase Auth",
    columns: ["id (uuid, PK → auth.users)", "username (unique, ≥ 3 chars)", "first_name", "last_name", "updated_at"],
  },
  {
    name: "accounts",
    note: "Each bank account a user connects",
    columns: ["id (PK)", "user_id (FK → auth.users)", "routing", "institution", "type", "balance", "created_at"],
  },
  {
    name: "balance_log",
    note: "A history of every balance change. It powers the charts, cash flow and transaction history",
    columns: ["account_id (FK → accounts)", "created_at", "old_balance", "new_balance"],
  },
  {
    name: "transactions",
    note: "An audit trail of money transfers",
    columns: ["from_account_id", "to_account_id", "amount", "timestamp"],
  },
];

const functions = [
  "fetch_user_accounts",
  "fetch_total_balance",
  "fetch_money_in",
  "fetch_money_out",
  "fetch_balance_logs",
];

const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Recharts",
  "PostgreSQL",
  "Supabase",
];

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-muted/50 px-6 py-5 sm:py-6 shadow outline outline-muted/70">
      <h2 className="flex items-center gap-2 text-lg tracking-tight text-black/80">
        <Icon className="size-5 text-muted-foreground" />
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Intro */}
      <section className="rounded-xl bg-gradient-to-br from-muted/100 via-indigo-100 to-muted px-6 py-8 sm:px-10 sm:py-10 shadow outline outline-muted/70">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-800">
            <Trophy className="size-3.5" />
            1st place in class project rankings
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-muted-foreground">
            <GraduationCap className="size-3.5" />
            Database class project · Fall 2024
          </span>
        </div>
        <h1 className="mt-5 text-3xl sm:text-4xl tracking-tight text-black/90">
          About Nova
        </h1>
        <p className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground">
          Built by
          {authors.map((a, i) => (
            <span key={a.github} className="inline-flex items-center gap-1.5">
              {i > 0 && <span>&</span>}
              <a
                href={`https://github.com/${a.github}`}
                target="_blank"
                rel="noreferrer"
                title={`${a.name} on GitHub (@${a.github})`}
                className="inline-flex items-center gap-1 font-medium text-black/80 underline-offset-4 hover:underline"
              >
                <Github className="size-4" />
                {a.name}
              </a>
            </span>
          ))}
        </p>
        <div className="mt-6 max-w-3xl space-y-4 text-black/75 leading-relaxed">
          <p>
            Nova started as our project for a Database class. It was the
            first time either of us had worked with PostgreSQL, so we set out to
            learn it by building something real: a banking dashboard where you
            can connect accounts, move money around, and see where it all goes.
          </p>
          <p>
            Mostly we wanted to have fun with it, and to make something that
            looked clean and could actually be useful someday, not just a set
            of tables behind a bare form. That paid off: Nova took{" "}
            <strong className="font-medium text-black/90">first place</strong>{" "}
            in our class&apos;s project rankings. As far as we can tell, our
            professor thought it looked and worked the best.
          </p>
        </div>
      </section>

      {/* What it does */}
      <Section icon={Sparkles} title="What it does">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-lg bg-background px-4 py-3 shadow-sm outline outline-muted/70">
              <h3 className="font-medium text-black/80">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Database */}
      <Section icon={Database} title="How the database worked">
        <p className="max-w-3xl text-sm text-muted-foreground">
          The backend was PostgreSQL, hosted on Supabase, with Supabase Auth for
          sign-up and login. The core design idea was the{" "}
          <code className="rounded bg-background px-1 py-0.5 text-black/80">balance_log</code>{" "}
          table: every time a balance changed, we stored the old and new
          values. The dashboard&apos;s cash flow, the balance charts, the
          transaction history and the leaderboard are all calculated from that
          one log.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {tables.map((t) => (
            <div key={t.name} className="rounded-lg bg-background px-4 py-3 shadow-sm outline outline-muted/70">
              <h3 className="font-mono text-sm font-medium text-black/80">{t.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{t.note}</p>
              <ul className="mt-3 space-y-1 font-mono text-xs text-black/70">
                {t.columns.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Most queries ran through Postgres functions called over Supabase RPC:{" "}
          {functions.map((fn, i) => (
            <span key={fn}>
              <code className="rounded bg-background px-1 py-0.5 text-xs text-black/80">{fn}</code>
              {i < functions.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </Section>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Stack */}
        <Section icon={Layers} title="Built with">
          <div className="flex flex-wrap gap-2">
            {stack.map((s) => (
              <span key={s} className="rounded-full bg-background px-3 py-1 text-sm text-black/75 shadow-sm outline outline-muted/70">
                {s}
              </span>
            ))}
          </div>
        </Section>

        {/* Today */}
        <Section icon={FolderGit2} title="Where it is today">
          <p className="text-sm text-muted-foreground">
            The original Supabase database has since been shut down, so this
            version runs as a demo: you&apos;re signed in automatically, the
            data is generated, and nothing is saved. The original
            database-backed code is kept in the repo&apos;s{" "}
            <code className="rounded bg-background px-1 py-0.5 text-xs text-black/80">legacy-supabase</code>{" "}
            folder.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-medium text-black/80 underline underline-offset-4"
            >
              View the code on GitHub <ArrowRight className="size-3.5" />
            </a>
            <Link
              href="/protected/dashboard"
              className="inline-flex items-center gap-1 font-medium text-black/80 underline underline-offset-4"
            >
              Try the dashboard <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </Section>
      </div>
    </div>
  );
}
