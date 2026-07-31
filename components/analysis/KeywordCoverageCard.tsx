import { Search, AlertCircle, CheckCircle2 } from "lucide-react";

type KeywordCoverageCardProps = {
  keywords: string[];
};

export default function KeywordCoverageCard({
  keywords,
}: KeywordCoverageCardProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-yellow-100 p-4">
          <Search className="h-7 w-7 text-yellow-600" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600">
            ATS Optimization
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            Keyword Coverage
          </h2>

          <p className="mt-2 max-w-2xl text-gray-600">
            These keywords are commonly found in job descriptions but were not
            detected in your resume. Including relevant keywords can improve ATS
            matching.
          </p>
        </div>
      </div>

      {keywords.length === 0 ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-white p-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-800">
                Excellent Keyword Coverage
              </h3>

              <p className="mt-2 leading-7 text-green-700">
                Your resume already includes the important keywords identified
                by the AI. Continue tailoring it for each specific job
                application to maximize your ATS compatibility.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
            <div className="flex items-center gap-4">
              <AlertCircle className="h-7 w-7 text-yellow-600" />

              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {keywords.length} Missing Keyword
                  {keywords.length > 1 ? "s" : ""}
                </h3>

                <p className="mt-1 text-gray-600">
                  Consider adding these where they genuinely reflect your
                  experience and skills.
                </p>
              </div>
            </div>
          </div>

          {/* Keyword Chips */}
          <div className="flex flex-wrap gap-3">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="rounded-full border border-yellow-300 bg-yellow-100 px-5 py-3 text-sm font-semibold text-yellow-800 transition hover:bg-yellow-200"
              >
                {keyword}
              </span>
            ))}
          </div>

          {/* Tip */}
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="font-semibold text-blue-900">💡 Pro Tip</h3>

            <p className="mt-2 leading-7 text-blue-800">
              Don't add keywords just to increase your ATS score. Only include
              skills and technologies you genuinely possess, and incorporate
              them naturally into your projects, experience, or skills section.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
