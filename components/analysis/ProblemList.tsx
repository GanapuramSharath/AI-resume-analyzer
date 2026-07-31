import { AlertTriangle, Search, Wrench } from "lucide-react";
import ProblemCard from "./ProblemCard";

type ProblemListProps = {
  weaknesses: string[];
  missingKeywords: string[];
  improvements: string[];
};

export default function ProblemList({
  weaknesses,
  missingKeywords,
  improvements,
}: ProblemListProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          Priority Fixes
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          Improve Your Resume
        </h2>

        <p className="mt-3 max-w-3xl text-gray-600">
          These are the most important improvements AI identified. Addressing
          these issues can improve ATS compatibility and make your resume more
          attractive to recruiters.
        </p>
      </div>

      <div className="space-y-10">
        {/* Critical Issues */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-red-100 p-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Critical Issues
              </h3>

              <p className="text-sm text-gray-500">
                Problems reducing your interview chances.
              </p>
            </div>
          </div>

          {weaknesses.length === 0 ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-medium text-green-700">
                No major weaknesses detected.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {weaknesses.map((item, index) => (
                <ProblemCard
                  key={`weakness-${index}`}
                  title={`Issue ${index + 1}`}
                  description={item}
                  type="weakness"
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Missing Keywords */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-yellow-100 p-2">
              <Search className="h-5 w-5 text-yellow-700" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Missing Keywords
              </h3>

              <p className="text-sm text-gray-500">
                Skills recruiters and ATS systems may expect.
              </p>
            </div>
          </div>

          {missingKeywords.length === 0 ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-medium text-green-700">
                No important keywords are missing.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {missingKeywords.map((item, index) => (
                <ProblemCard
                  key={`keyword-${index}`}
                  title={item}
                  description="This keyword was not detected in your resume and may be expected by recruiters or ATS systems."
                  type="keyword"
                />
              ))}
            </div>
          )}
        </div>

        {/* Recommended Improvements */}
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2">
              <Wrench className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Recommended Improvements
              </h3>

              <p className="text-sm text-gray-500">
                Actionable suggestions to strengthen your resume.
              </p>
            </div>
          </div>

          {improvements.length === 0 ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
              <p className="font-medium text-green-700">
                No additional improvements suggested.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {improvements.map((item, index) => (
                <ProblemCard
                  key={`improvement-${index}`}
                  title={`Recommendation ${index + 1}`}
                  description={item}
                  type="improvement"
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
