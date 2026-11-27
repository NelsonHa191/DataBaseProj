# Legacy Supabase version

This folder holds the **original code** for Nova from when it ran on a real
Supabase (PostgreSQL + Auth) backend. That database has been shut down, so the
live app now runs in **demo mode** with in-memory sample data
(see `components/DemoProvider.tsx` and `lib/demo-data.ts` in the project root).

Nothing here is imported or built. It's kept for reference, and so the real
database version can be brought back if needed.

## What's in here

The folder mirrors the project root. Each file is the original version of a
file that demo mode replaced or removed:

| Path | What it did |
| --- | --- |
| `actions/actions.ts` | Server actions: sign up, sign in, sign out, connect bank, transfer money, filter transactions, chart data |
| `utils/supabase/*` | Supabase clients for the server, browser and middleware, plus the env var check |
| `utils/utils.ts` | `encodedRedirect` helper for passing error/success messages through redirects |
| `app/auth/callback/route.ts` | Email confirmation / OAuth code exchange |
| `app/(auth-pages)/*` | Real sign-in and sign-up forms |
| `app/protected/**` | Pages that queried Supabase tables and RPCs |
| `components/*` | Components that called the server actions above |
| `types/index.d.ts` | Original shared types |
| `package.original.json` | Original dependencies, including `@supabase/*` |

## Bringing the database back

1. Create a Supabase project and set up the tables from the main README
   (`profiles`, `accounts`, `balance_log`, `transactions`). Then add the RPC
   functions the code calls: `fetch_total_balance`, `fetch_money_in`,
   `fetch_money_out`, `fetch_user_accounts` and `fetch_balance_logs`.
2. Install the Supabase packages:
   ```bash
   npm install @supabase/ssr @supabase/supabase-js @supabase/auth-helpers-nextjs
   ```
3. Add a `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   ```
4. Copy the files from this folder over their counterparts in the project root.
   Then delete `app/protected/layout.tsx`, `app/protected/page.tsx`,
   `components/DemoProvider.tsx` and `lib/demo-data.ts`.
