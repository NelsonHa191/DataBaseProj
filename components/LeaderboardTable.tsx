interface LeaderboardUser {
  username: string;
  totalNetGainLoss: number; // Updated to match the key used in your data
}

interface LeaderboardTableProps {
  data: LeaderboardUser[];
}

export default function LeaderboardTable({ data }: LeaderboardTableProps) {
  return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-right">Total Net Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="px-4 py-2 text-left">{user.username}</td>
              <td className="px-4 py-2 text-right">
                {(user.totalNetGainLoss ?? 0).toFixed(2)} {/* Updated here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}
