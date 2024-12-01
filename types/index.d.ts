export type userInfoProps = {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type accountProps = {
  institution: string;
  type: string;
  routing: string;
  balance: number;
}

export type chartDataProps = {
  date: string;
  balance: number;
}