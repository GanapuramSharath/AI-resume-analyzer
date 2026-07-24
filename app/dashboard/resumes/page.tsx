import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, FileText, ArrowRight, BadgeCheck } from "lucide-react";

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      analyses: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">Resume History</h1>

        <p className="mt-2 text-slate-500">
          View all your previous resume analyses.
        </p>
      </div>

      {resumes.length === 0 ? (
        <div className="rounded-3xl border bg-white p-16 text-center shadow-sm">
          <FileText size={60} className="mx-auto mb-5 text-slate-300" />

          <h2 className="text-2xl font-semibold">No Resume Found</h2>

          <p className="mt-2 text-slate-500">
            Upload a resume to begin your first analysis.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Upload Resume
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {resumes.map((resume) => {
            const analysis = resume.analyses[0];

            const score = analysis?.atsScore ?? 0;
            const scoreColor =
              score >= 80
                ? "bg-green-100 text-green-700"
                : score >= 60
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700";

            return (
              <Link
                key={resume.id}
                href={`/dashboard/resume/${resume.id}`}
                className="block rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                      <FileText className="text-blue-600" size={30} />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        {resume.fileName}
                      </h2>

                      <div className="mt-2 flex items-center gap-2 text-slate-500">
                        <Calendar size={16} />

                        {resume.createdAt.toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm text-slate-500">ATS Score</p>

                      <div
                        className={`mt-2 rounded-full px-4 py-2 text-lg font-bold ${scoreColor}`}
                      >
                        {score}
                      </div>
                    </div>

                    <BadgeCheck className="text-green-500" size={24} />

                    <ArrowRight className="text-slate-400" size={22} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
