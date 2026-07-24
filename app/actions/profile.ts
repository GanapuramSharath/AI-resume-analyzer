"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateProfileData {
  name: string;
  username: string;
  phone: string;
}

export async function updateProfile(data: UpdateProfileData) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Update User table
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: data.name,
      username: data.username,
    },
  });

  // Update Profile table
 await prisma.profile.upsert({
   where: {
     userId: session.user.id,
   },
   update: {
     phone: data.phone,
     github: data.github,
     linkedin: data.linkedin,
     portfolio: data.portfolio,
   },
   create: {
     userId: session.user.id,
     phone: data.phone,
     github: data.github,
     linkedin: data.linkedin,
     portfolio: data.portfolio,
   },
 });
interface UpdateProfileData {
  name: string;
  username: string;
  phone: string;

  github: string;
  linkedin: string;
  portfolio: string;
}
  revalidatePath("/dashboard/profile");

  return {
    success: true,
  };
}
