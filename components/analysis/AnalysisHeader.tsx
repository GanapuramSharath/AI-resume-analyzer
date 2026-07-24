import { CalendarDays, Clock3, FileText } from "lucide-react";

type AnalysisHeaderProps = {
  fileName: string;
  uploadedAt: Date | string;
  processingTime?: string;
};

export default function AnalysisHeader({
  fileName,
  uploadedAt,
  processingTime,
}: AnalysisHeaderProps) {
  const formattedDate = new Date(uploadedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-5">
          <div className="rounded-2xl bg-blue-100 p-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Resume Analysis
            </h1>

            <p className="mt-2 text-lg font-medium text-gray-700">{fileName}</p>

            <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} />

                <span>{formattedDate}</span>
              </div>

              {processingTime && (
                <div className="flex items-center gap-2">
                  <Clock3 size={18} />

                  <span>{processingTime}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Badge */}
        <div className="rounded-full bg-green-100 px-6 py-3">
          <span className="font-semibold text-green-700">
            Analysis Complete
          </span>
        </div>
      </div>
    </section>
  );
}
