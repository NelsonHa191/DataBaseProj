# Financial Banking Manager/Dashboard WebApp

A modern banking WebApp that allows users to connect multiple bank account and have access to many features.

## Functions

- **Cash Flow Function**
  - Evaluate and shows total $ deposit and withdrawals for the current month
 
- **Balance Activity Chart**
  - Chart that shows balance activity for a bank account for the last 3 months

- **Detailed Dashboard**
  - Shows Cash Flow, Balance Activity Chart, Total Balance of all bank accounts combined
  - Shows recent bank account amount vs last month and compares it
  - Has recent transaction history
  - Shows each individual bank account balanc

- **Transaction History**
  - Table shows all recent activities from spending to receiving payments
  - Has a filtering system where you can pick which bank to choose to view
  - Has a date selection system from viewing All Time, Last 7 Days, Last 30 Days, and Last 90 Days

- **Transfer Money**
  - Transferring Money where users can input routing numbers of other users and transfer money to them
  - Allows users to transfer money between accounts

- **Bank Account Adding**
  - Connect a bank through your routing number (not really and do not add your actual routing number)
  - Displays your bank name and what type of account it is

- **Advanced Leaderboard**
  - Takes all users details within database, goes through all tables, and calculates all total net gain/loss
  - Ranks them and only shows their Username publicly
  - No other details can be shown besides Username to ensure privacy

## Technology Stack

- **Frontend**
  - React.js with TypeScript
  - Tailwind CSS for styling
  - Lucide React for icons

- **Backend**
  - PostgreSQL database hosted by Supabase

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (version 14 or higher)
- React version 18 or higher
- npm (comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NelsonHa191/DataBaseProj.git
cd DataBaseProj
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Edit `.env.local` file with your configuration.
For Database - Check '.env.local' details within the essay turned in.

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
actions/
├── action.ts          # Performs backend functions
app/
├── (auth-pages)/
│   ├── sign-in        # Authenticated pages for Sign in
│   ├── sign-up        # And Sign up
├── protected/
│   ├── (main-pages)   # Where all the function pages are
│   ├── onboarding     # Where the onboarding page and function is
components/            # Provides a lot of front end components
public/                # Images
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Database Schema

### profiles Table
```sql
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  first_name text,
  last_name text

  constraint username_length check (char_length(username) >= 3)
);
```

### balanace_log Table
```sql
create table balance_log (
  account_id int references accounts.id cascade not null primary key,
  created_at timestamp not null with time zone primary key,
  old_balance numeric,
  new_balance numeric
);
```

### accounts Table
```sql
create table accounts (
  id int on delete cascade not null primary key,
  user_id uuid references auth.users on delete cascade not null 
  created_at timestamp not null with time zone,
  routing text,
  institution text,
  type text,
  balance numeric
);
```

## Contributing

1. Fork the repository
2. Create your branch (`git checkout -b something`)
3. Commit your changes (`git commit -m 'Add something'`)
4. Push to the branch (`git push origin something`)
5. Open a Pull Request

## Future Enhancements

- [ ] Better filtering system for transactions
- [ ] Better rework of frontend design
- [ ] Rework of Leaderboard
- [ ] Mobile App Integration
