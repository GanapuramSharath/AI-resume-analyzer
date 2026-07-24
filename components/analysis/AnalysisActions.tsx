import { Download, RotateCcw, History } from "lucide-react";
import Link from "next/link";

type AnalysisActionsProps = {
  resumeId: string;
  fileUrl?: string;
};

export default function AnalysisActions({
  resumeId,
  fileUrl,
}: AnalysisActionsProps) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Quick Actions</h2>

      <div className="grid gap-4 md:grid-cols-3">
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            <Download size={20} />
            Download Resume
          </a>
        )}

        <Link
          href="/dashboard"
          className="flex items-center justify-center gap-3 rounded-2xl border border-gray-300 px-6 py-4 font-semibold transition hover:bg-gray-100"
        >
          <RotateCcw size={20} />
          Analyze Another
        </Link>

        <Link
          href="/dashboard/history"
          className="flex items-center justify-center gap-3 rounded-2xl border border-gray-300 px-6 py-4 font-semibold transition hover:bg-gray-100"
        >
          <History size={20} />
          Analysis History
        </Link>
      </div>
    </section>
  );
}
