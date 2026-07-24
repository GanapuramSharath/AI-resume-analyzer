import { FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

type Analysis = {
  id: string;
  fileName: string;
  createdAt: Date;
  atsScore: number;
};

type Props = {
  recentAnalyses: Analysis[];
};

export default function RecentAnalysis({ recentAnalyses }: Props) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Recent Analyses</h2>

          <p className="mt-1 text-gray-500">
            Your latest resume analysis history.
          </p>
        </div>

        <Link
          href="/dashboard/history"
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {recentAnalyses.map((analysis) => (
          <Link
            href={`/dashboard/resume/${analysis.id}`}
            key={analysis.id}
            className="block"
          >
            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5 transition hover:border-blue-400 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-3">
                  <FileText className="text-blue-600" size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {analysis.fileName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(analysis.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div
                  className={`rounded-full px-5 py-2 text-lg font-bold ${
                    analysis.atsScore >= 85
                      ? "bg-green-100 text-green-700"
                      : analysis.atsScore >= 70
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {analysis.atsScore}
                </div>

                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
