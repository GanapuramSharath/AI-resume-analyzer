import { AlertTriangle } from "lucide-react";

type WeaknessesCardProps = {
  weaknesses: string[];
};

export default function WeaknessesCard({ weaknesses }: WeaknessesCardProps) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-red-100 p-3">
          <AlertTriangle className="text-red-600" size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Weaknesses</h2>

          <p className="text-gray-500">Areas that reduce ATS effectiveness</p>
        </div>
      </div>

      <div className="space-y-4">
        {weaknesses.map((weakness, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50 p-5"
          >
            <AlertTriangle className="mt-1 text-red-600" size={20} />

            <p className="leading-7 text-gray-700">{weakness}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
