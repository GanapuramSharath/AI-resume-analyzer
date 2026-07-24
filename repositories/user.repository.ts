import { prisma } from "@/lib/prisma";

type CreateUserData = {
  username: string;
  email: string;
  passwordHash: string;
};

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser(data: CreateUserData) {
  return prisma.user.create({
    data,
  });
}
