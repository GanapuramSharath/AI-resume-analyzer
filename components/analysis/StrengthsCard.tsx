import { CheckCircle2 } from "lucide-react";

type StrengthsCardProps = {
  strengths: string[];
};

export default function StrengthsCard({ strengths }: StrengthsCardProps) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-green-100 p-3">
          <CheckCircle2 className="text-green-600" size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Strengths</h2>

          <p className="text-gray-500">
            Strong points identified in your resume
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {strengths.map((strength, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-2xl border border-green-100 bg-green-50 p-5"
          >
            <CheckCircle2 className="mt-1 text-green-600" size={20} />

            <p className="leading-7 text-gray-700">{strength}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
