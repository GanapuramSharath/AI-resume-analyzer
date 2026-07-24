import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import UploadCard from "@/components/dashboard/UploadCard";
import RecentAnalysis from "@/components/dashboard/RecentAnalysis";

export default async function DashboardPage() {
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
    take: 5,
  });

  const recentAnalyses = resumes.map((resume) => ({
    id: resume.id,
    fileName: resume.fileName,
    createdAt: resume.createdAt,
    atsScore: resume.analyses[0]?.atsScore ?? 0,
  }));

  return (
    <main className="space-y-8">
      <WelcomeBanner
        name={session.user.name ?? "User"}
        currentPlan="Free"
        analyses={recentAnalyses.length}
        remaining={5 - recentAnalyses.length}
      />

      <UploadCard />

      <RecentAnalysis recentAnalyses={recentAnalyses} />
      
    </main>
  );
}
