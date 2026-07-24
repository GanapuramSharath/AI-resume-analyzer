import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

import TailoringClient from "@/components/tailoring/TailoringClient";

export default async function TailoringPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const resumes = await prisma.resume.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      analyses: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <TailoringClient resumes={resumes} />;
}
