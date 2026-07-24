import { Briefcase } from "lucide-react";
import MatchBadge from "./MatchBadge";

type Props = {
  title: string;
  match: number;
  reason: string;
};

export default function JobCard({ title, match, reason }: Props) {
  // Simple skill extraction from the reason
  const skills = reason
    .replace(/\./g, "")
    .split(/,|and/)
    .map((skill) => skill.trim())
    .filter((skill) => skill.length > 1)
    .slice(0, 4);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-6">
        <div className="flex gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <Briefcase className="h-8 w-8 text-blue-600" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

            <p className="mt-2 max-w-md text-gray-600 leading-relaxed">
              {reason}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <MatchBadge match={match} />

         
        </div>
      </div>

      {skills.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
