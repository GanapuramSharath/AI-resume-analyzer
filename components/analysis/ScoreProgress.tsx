type ScoreProgressProps = {
  score: number;
};

export default function ScoreProgress({ score }: ScoreProgressProps) {
  let color = "bg-red-500";

  if (score >= 85) {
    color = "bg-green-500";
  } else if (score >= 70) {
    color = "bg-yellow-500";
  }

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between text-sm text-gray-500">
        <span>ATS Compatibility</span>

        <span>{score}%</span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
}
