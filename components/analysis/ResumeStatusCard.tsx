import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

type ResumeStatusCardProps = {
  atsScore: number;
  issuesCount: number;
};

export default function ResumeStatusCard({
  atsScore,
  issuesCount,
}: ResumeStatusCardProps) {
  let status = "Needs Improvement";
  let statusColor = "text-red-600";
  let badgeColor = "bg-red-100 text-red-700";
  let message =
    "Your resume has several issues that may reduce interview chances.";

  if (atsScore >= 90) {
    status = "Excellent";
    statusColor = "text-green-600";
    badgeColor = "bg-green-100 text-green-700";
    message = "Your resume is well optimized and ready for most ATS systems.";
  } else if (atsScore >= 75) {
    status = "Good";
    statusColor = "text-yellow-600";
    badgeColor = "bg-yellow-100 text-yellow-700";
    message =
      "Your resume performs well, but a few improvements can increase recruiter visibility.";
  }

  const estimatedGain = Math.min(20, issuesCount * 2);

  const predictedScore = Math.min(100, atsScore + estimatedGain);

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Left */}
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Resume Status
          </p>

          <h2 className="mt-3 text-4xl font-bold text-gray-900">{status}</h2>

          <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">
            {message}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Current ATS Score</p>

              <p className="mt-3 text-4xl font-bold text-gray-900">
                {atsScore}%
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Issues Found</p>

              <p className="mt-3 text-4xl font-bold text-red-600">
                {issuesCount}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-5">
              <p className="text-sm text-gray-500">Estimated Improvement</p>

              <p className="mt-3 text-4xl font-bold text-green-600">
                +{estimatedGain}
              </p>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex w-full max-w-sm flex-col justify-between rounded-3xl bg-slate-900 p-8 text-white">
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${badgeColor}`}
            >
              {atsScore >= 90 ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertTriangle size={18} />
              )}

              {status}
            </div>

            <h3 className="mt-8 text-xl font-semibold">
              Predicted Score After AI Fixes
            </h3>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-5xl font-bold">{atsScore}</span>

              <ArrowUpRight className="h-8 w-8 text-green-400" />

              <span className="text-5xl font-bold text-green-400">
                {predictedScore}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Completing the recommended improvements can significantly increase
              ATS compatibility and recruiter visibility.
            </p>
          </div>

          <div className="mt-10">
            <div className="mb-2 flex justify-between text-sm">
              <span>Optimization Progress</span>

              <span>{atsScore}%</span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-700">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-700"
                style={{
                  width: `${atsScore}%`,
                }}
              />
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-green-300">
              <TrendingUp size={18} />

              <span>
                AI identified {issuesCount} improvements worth reviewing.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
