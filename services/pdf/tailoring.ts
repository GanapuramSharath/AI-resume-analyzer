import { prisma } from "@/lib/prisma";

export async function getTailoring(tailoringId: string) {
  const tailoring = await prisma.resumeTailoring.findUnique({
    where: {
      id: tailoringId,
    },
    include: {
      resume: true,
    },
  });

  if (!tailoring) {
    throw new Error("Tailoring not found.");
  }

  return tailoring;
}