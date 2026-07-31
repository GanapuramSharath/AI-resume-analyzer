import {
  AlertTriangle,
  Search,
  Wrench,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

type ProblemType = "weakness" | "keyword" | "improvement";

type ProblemCardProps = {
  title: string;
  description: string;
  type: ProblemType;
  index?: number;
};

export default function ProblemCard({
  title,
  description,
  type,
  index,
}: ProblemCardProps) {
  let Icon: LucideIcon = AlertTriangle;
  let badge = "Critical";
  let badgeClass = "bg-red-100 text-red-700";
  let borderClass = "border-red-200";
  let iconBg = "bg-red-100";
  let iconColor = "text-red-600";

  if (type === "keyword") {
    Icon = Search;
    badge = "Missing Keyword";
    badgeClass = "bg-yellow-100 text-yellow-700";
    borderClass = "border-yellow-200";
    iconBg = "bg-yellow-100";
    iconColor = "text-yellow-700";
  }

  if (type === "improvement") {
    Icon = Wrench;
    badge = "Recommendation";
    badgeClass = "bg-blue-100 text-blue-700";
    borderClass = "border-blue-200";
    iconBg = "bg-blue-100";
    iconColor = "text-blue-700";
  }

  return (
    <div
      className={`rounded-2xl border ${borderClass} bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`rounded-xl ${iconBg} p-3`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>

          <div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
            >
              {badge}
            </span>

            <h3 className="mt-3 text-lg font-semibold text-gray-900">
              {title}
            </h3>

            <p className="mt-2 leading-7 text-gray-600">{description}</p>
          </div>
        </div>

        {typeof index === "number" && (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-700">
            {index + 1}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-sm text-gray-500">
          Review this recommendation
        </span>

        <ArrowRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
