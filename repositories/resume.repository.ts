import { prisma } from "@/lib/prisma";

export async function getRecentAnalyses(userId: string) {
  return prisma.resume.findMany({
    where: {
      userId,
    },

    include: {
      analyses: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 5,
  });
}
