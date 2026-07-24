"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAvatar(url: string) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  await prisma.profile.upsert({
    where: {
      userId: session.user.id,
    },
    update: {
      avatar: url,
    },
    create: {
      userId: session.user.id,
      avatar: url,
    },
  });

  revalidatePath("/dashboard/profile");
}
