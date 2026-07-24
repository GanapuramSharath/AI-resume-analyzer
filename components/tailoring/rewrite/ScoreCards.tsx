import { Award, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";

type Props = {
  atsScore: number;
  jobMatch: number;
  breakdown?: {
    keywordScore: number;
    matchedSkillScore: number;
    missingSkillPenalty: number;
    sectionScore?: number;
    finalScore: number;
  };
};

function getGrade(score: number) {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  return "D";
}

function getStatus(score: number) {
  if (score >= 90) return "Outstanding Resume";
  if (score >= 80) return "Strong ATS Resume";
  if (score >= 70) return "Good Match";
  if (score >= 60) return "Needs Improvement";
  return "Significant Improvements Needed";
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-5 h-3 w-full rounded-full bg-white/20">
      <div
        className="h-3 rounded-full bg-white transition-all duration-500"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
        }}
      />
    </div>
  );
}

export default function ScoreCards({ atsScore, jobMatch, breakdown }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ATS CARD */}

      <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-blue-100">
              ATS Score
            </p>

            <h2 className="mt-3 text-6xl font-bold">{atsScore}%</h2>

            <p className="mt-3 text-blue-100">{getStatus(atsScore)}</p>
          </div>

          <div className="text-center">
            <Award className="mx-auto mb-3 h-10 w-10" />

            <div className="text-4xl font-bold">{getGrade(atsScore)}</div>

            <p className="text-sm text-blue-100">Resume Grade</p>
          </div>
        </div>

        <ProgressBar value={atsScore} />
      </div>

      {/* JOB MATCH CARD */}

      <div className="rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-green-100">
              Job Match
            </p>

            <h2 className="mt-3 text-6xl font-bold">{jobMatch}%</h2>

            <p className="mt-3 text-green-100">Compatibility with this role</p>
          </div>

          <Briefcase className="h-12 w-12" />
        </div>

        <ProgressBar value={jobMatch} />
      </div>

      {/* BREAKDOWN */}

      {breakdown && (
        <div className="lg:col-span-2 rounded-2xl border bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-blue-600" />

            <h3 className="text-2xl font-bold">Score Breakdown</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <StatCard
              title="Keyword Match"
              value={`${breakdown.keywordScore}%`}
            />

            <StatCard
              title="Matched Skills"
              value={`${breakdown.matchedSkillScore}%`}
            />

            <StatCard
              title="Section Quality"
              value={`${breakdown.sectionScore ?? 0}%`}
            />

            <StatCard
              title="Missing Skill Penalty"
              value={`-${breakdown.missingSkillPenalty}%`}
            />
          </div>

          <div className="mt-8 rounded-xl bg-blue-50 p-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600" />

              <span className="font-semibold">Overall Match Score</span>
            </div>

            <p className="mt-2 text-3xl font-bold text-blue-700">
              {breakdown.finalScore}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border bg-gray-50 p-5">
      <p className="text-sm text-gray-500">{title}</p>

      <h4 className="mt-2 text-3xl font-bold">{value}</h4>
    </div>
  );
}
