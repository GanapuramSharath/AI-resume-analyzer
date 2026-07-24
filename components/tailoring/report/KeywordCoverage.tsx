import { CheckCircle2, XCircle, Search } from "lucide-react";

type Props = {
  matched: number;
  total: number;
  matchedSkills?: string[];
  missing: string[];
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-4 h-3 w-full rounded-full bg-slate-200">
      <div
        className="h-3 rounded-full bg-blue-600 transition-all duration-500"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
        }}
      />
    </div>
  );
}

export default function KeywordCoverage({
  matched,
  total,
  matchedSkills = [],
  missing,
}: Props) {
  const percent = total === 0 ? 0 : Math.round((matched / total) * 100);

  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Search className="h-6 w-6 text-blue-600" />

        <div>
          <h2 className="text-2xl font-bold">Keyword Coverage</h2>

          <p className="text-sm text-slate-500">
            ATS keyword matching against the job description
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl bg-blue-50 p-6">
          <p className="text-sm text-slate-500">Coverage</p>

          <h3 className="mt-2 text-5xl font-bold text-blue-700">{percent}%</h3>

          <ProgressBar value={percent} />

          <p className="mt-4 text-sm text-slate-600">
            {matched} of {total} required keywords found.
          </p>
        </div>

        <div className="rounded-xl border p-6">
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />

            <h3 className="font-semibold">
              Matched Skills ({matchedSkills.length})
            </h3>
          </div>

          {matchedSkills.length === 0 ? (
            <p className="text-sm text-slate-500">
              No matched skills detected.
            </p>
          ) : (
            <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto">
              {matchedSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border p-6">
          <div className="mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />

            <h3 className="font-semibold">Missing Skills ({missing.length})</h3>
          </div>

          {missing.length === 0 ? (
            <p className="text-sm text-green-600">
              Excellent! No missing keywords found.
            </p>
          ) : (
            <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto">
              {missing.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
                >
                  ✕ {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
