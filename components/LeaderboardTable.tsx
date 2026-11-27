import { LeaderboardUser } from "@/types";

export default function LeaderboardTable({ data }: { data: LeaderboardUser[] }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200">
          <th className="px-4 py-2 text-left">#</th>
          <th className="px-4 py-2 text-left">Username</th>
          <th className="px-4 py-2 text-right">Total Net Gain/Loss</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr
            key={user.username}
            className={user.isYou ? "bg-indigo-100 font-medium" : index % 2 === 0 ? "bg-gray-100" : ""}
          >
            <td className="px-4 py-2 text-left">{index + 1}</td>
            <td className="px-4 py-2 text-left">
              {user.username}
              {user.isYou && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}
            </td>
            <td className="px-4 py-2 text-right">${(user.totalNetGainLoss ?? 0).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
