import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import JobGrid from "@/components/jobs/JobGrid";

export default async function JobPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const latest = await prisma.resume.findFirst({
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

  const analysis = latest?.analyses[0];

  if (!analysis) {
    return (
      <div className="p-12">
        <h1 className="text-3xl font-bold">Job Match</h1>

        <p className="mt-4 text-gray-500">Analyze a resume first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Recommended Jobs</h1>

        <p className="mt-2 text-gray-500">
          Jobs best suited for your latest resume.
        </p>
      </div>

      <JobGrid jobs={(analysis.jobMatches as any[]) ?? []} />
    </div>
  );
}
