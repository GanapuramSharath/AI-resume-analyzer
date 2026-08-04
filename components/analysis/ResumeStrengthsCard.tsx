import { CheckCircle2, Sparkles } from "lucide-react";

type Strength = {
  title: string;
  description: string;
};

type ResumeStrengthsCardProps = {
  strengths: Strength[];
};

export default function ResumeStrengthsCard({
  strengths,
}: ResumeStrengthsCardProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-green-100 p-4">
          <Sparkles className="h-7 w-7 text-green-600" />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
            Resume Highlights
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            What&apos;s Working Well
          </h2>

          <p className="mt-2 max-w-2xl text-gray-600">
            These parts of your resume already meet recruiter and ATS
            expectations. Keep them as you improve the rest of your resume.
          </p>
        </div>
      </div>

      {strengths.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-500">
            No major strengths were identified yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {strengths.map((strength, index) => (
            <div
              key={index}
              className="rounded-2xl border border-green-200 bg-green-50 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white p-2 shadow-sm">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {strength.title || `Strength ${index + 1}`}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-700">
                    {strength.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {strengths.length > 0 && (
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
          <h3 className="font-semibold text-blue-900">Keep these strengths</h3>

          <p className="mt-2 leading-7 text-blue-800">
            While updating your resume, preserve these strong sections. They
            already contribute positively to ATS compatibility and recruiter
            readability.
          </p>
        </div>
      )}
    </section>
  );
}
