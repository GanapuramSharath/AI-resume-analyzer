import ScoreCircle from "./ScoreCircle";
import ScoreProgress from "./ScoreProgress";

type ATSScoreCardProps = {
  score: number;
};

export default function ATSScoreCard({ score }: ATSScoreCardProps) {
  let title = "Needs Improvement";
  let color = "text-red-600";

  if (score >= 85) {
    title = "Excellent";
    color = "text-green-600";
  } else if (score >= 70) {
    title = "Good";
    color = "text-yellow-600";
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-3xl font-bold">ATS Score</h2>

      <div className="flex flex-col items-center gap-10 lg:flex-row">
        <ScoreCircle score={score} />

        <div className="flex-1 space-y-5">
          <div>
            <h3 className={`text-3xl font-bold ${color}`}>{title}</h3>

            <p className="mt-2 text-gray-500">
              Your resume&apos;s ATS compatibility score.
            </p>
          </div>

          <ScoreProgress score={score} />

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500">Formatting</p>

              <p className="mt-1 font-semibold">Good</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500">Keywords</p>

              <p className="mt-1 font-semibold">Review</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500">Readability</p>

              <p className="mt-1 font-semibold">High</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
