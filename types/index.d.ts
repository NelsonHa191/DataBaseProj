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
  id: int;
  user_id: string;
  created_at: string;
  routing: string;
  institution: string;
  type: string;
  balance: number;
};

export type BalanceLog = {
  account_id: int;
  created_at: string;
  old_balance: number;
  new_balance: number;
};

export type LeaderboardUser = {
  username: string;
  totalNetGainLoss: number;
};