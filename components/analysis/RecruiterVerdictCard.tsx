import { Briefcase, ClipboardCheck, TrendingUp } from "lucide-react";

type RecruiterVerdictCardProps = {
  summary: string;
};

export default function RecruiterVerdictCard({
  summary,
}: RecruiterVerdictCardProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-blue-100 p-4">
          <Briefcase className="h-7 w-7 text-blue-600" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Final Assessment
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            Recruiter's Verdict
          </h2>

          <p className="mt-2 text-gray-600">
            A recruiter-focused summary of your resume's overall quality and
            interview readiness.
          </p>
        </div>
      </div>

      {/* Verdict */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <div className="mb-4 flex items-center gap-3">
          <ClipboardCheck className="h-6 w-6 text-blue-600" />

          <h3 className="text-lg font-semibold text-gray-900">
            Overall Impression
          </h3>
        </div>

        <p className="text-lg leading-8 text-gray-700">{summary}</p>
      </div>

      {/* Bottom Note */}
      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-green-200 bg-green-50 p-6">
        <TrendingUp className="mt-1 h-6 w-6 text-green-600" />

        <div>
          <h3 className="font-semibold text-green-800">Recommendation</h3>

          <p className="mt-2 leading-7 text-green-700">
            Apply the recommended improvements before submitting your resume.
            Small changes to keywords, formatting, and content can improve both
            ATS compatibility and recruiter confidence.
          </p>
        </div>
      </div>
    </section>
  );
}
