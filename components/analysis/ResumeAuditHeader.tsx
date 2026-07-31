import {
  CalendarDays,
  Clock3,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

type ResumeAuditHeaderProps = {
  fileName: string;
  uploadedAt: Date | string;
  processingTime?: string;
  atsScore: number;
  issuesCount: number;
};

export default function ResumeAuditHeader({
  fileName,
  uploadedAt,
  processingTime,
  atsScore,
  issuesCount,
}: ResumeAuditHeaderProps) {
  const formattedDate = new Date(uploadedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const status =
    atsScore >= 90
      ? {
          title: "Excellent",
          description: "Your resume is interview-ready.",
          color: "bg-green-100 text-green-700",
          icon: CheckCircle2,
        }
      : atsScore >= 75
        ? {
            title: "Good",
            description: "A few improvements can boost your ATS score.",
            color: "bg-yellow-100 text-yellow-700",
            icon: TrendingUp,
          }
        : {
            title: "Needs Improvement",
            description:
              "AI found several issues reducing your interview chances.",
            color: "bg-red-100 text-red-700",
            icon: AlertTriangle,
          };

  const StatusIcon = status.icon;

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        {/* LEFT */}
        <div className="flex gap-5">
          <div className="rounded-2xl bg-blue-100 p-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Resume Audit
            </p>

            <h1 className="mt-2 text-4xl font-bold text-gray-900">
              {fileName}
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              AI analyzed your resume and found{" "}
              <span className="font-semibold text-gray-900">
                {issuesCount} improvement
                {issuesCount !== 1 ? "s" : ""}
              </span>{" "}
              that could increase your ATS score and improve recruiter
              visibility.
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                {formattedDate}
              </div>

              {processingTime && (
                <div className="flex items-center gap-2">
                  <Clock3 size={18} />
                  {processingTime}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex min-w-[280px] flex-col justify-between rounded-2xl bg-gray-50 p-6">
          <div>
            <p className="text-sm font-medium text-gray-500">Resume Status</p>

            <div
              className={`mt-3 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${status.color}`}
            >
              <StatusIcon size={18} />
              {status.title}
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              {status.description}
            </p>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">ATS Score</span>

              <span className="text-lg font-bold text-gray-900">
                {atsScore}%
              </span>
            </div>

            <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${atsScore}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
