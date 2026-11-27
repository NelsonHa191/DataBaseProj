export type userInfoProps = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type chartDataProps = {
  date: string;
  balance: number;
}

export type Account = {
  id: number;
  user_id: string;
  created_at: string;
  routing: string;
  institution: string;
  type: string;
  balance: number;
};

export type BalanceLog = {
  account_id: number;
  created_at: string;
  old_balance: number | null;
  new_balance: number;
};

export type LeaderboardUser = {
  username: string;
  totalNetGainLoss: number;
  isYou?: boolean;
};

export interface Transaction {
  account_id: number;
  created_at: string;
  old_balance: number | null;
  new_balance: number;
  accounts: {
    institution: string;
    routing: string;
    user_id: string;
  };
}
