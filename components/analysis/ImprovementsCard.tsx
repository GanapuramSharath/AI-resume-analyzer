import { Sparkles } from "lucide-react";

type ImprovementsCardProps = {
  improvements: string[];
};

export default function ImprovementsCard({
  improvements,
}: ImprovementsCardProps) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3">
          <Sparkles className="text-blue-600" size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Improvement Plan</h2>

          <p className="text-gray-500">
            Actionable recommendations to improve your ATS score
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {improvements.map((item, index) => (
          <div
            key={index}
            className="flex gap-5 rounded-2xl border border-blue-100 bg-blue-50 p-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
              {index + 1}
            </div>

            <p className="leading-7 text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
