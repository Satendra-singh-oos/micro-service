import { User } from "@prisma/client";
import { prisma } from "../../config/db/db";
import { UserRegistrationDTO } from "../../utils/types/user.type";

export async function getUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getUserByUsername(
  userName: string
): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      userName,
    },
  });
}

export async function createUser(
  data: UserRegistrationDTO
): Promise<{ id: string }> {
  return await prisma.user.create({
    data,
    select: {
      id: true,
    },
  });
}
