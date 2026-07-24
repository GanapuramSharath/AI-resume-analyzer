type ScoreCircleProps = {
  score: number;
};

export default function ScoreCircle({ score }: ScoreCircleProps) {
  let bg = "bg-red-100";
  let text = "text-red-600";

  if (score >= 85) {
    bg = "bg-green-100";
    text = "text-green-600";
  } else if (score >= 70) {
    bg = "bg-yellow-100";
    text = "text-yellow-600";
  }

  return (
    <div
      className={`flex h-36 w-36 items-center justify-center rounded-full ${bg}`}
    >
      <span className={`text-5xl font-bold ${text}`}>{score}</span>
    </div>
  );
}
