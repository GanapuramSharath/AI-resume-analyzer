type MatchBadgeProps = {
  match: number;
};

export default function MatchBadge({ match }: MatchBadgeProps) {
  const color =
    match >= 90
      ? "bg-green-100 text-green-700"
      : match >= 75
        ? "bg-blue-100 text-blue-700"
        : match >= 60
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700";

  const label =
    match >= 90
      ? "Excellent Match"
      : match >= 75
        ? "Strong Match"
        : match >= 60
          ? "Average Match"
          : "Low Match";

  return (
    <div className="inline-flex items-center gap-2">
      <span className={`rounded-full px-3 py-1 text-sm font-semibold ${color}`}>
        {match}%
      </span>

      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
}
