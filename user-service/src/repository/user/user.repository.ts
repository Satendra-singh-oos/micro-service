import { User } from "@prisma/client";
import { prisma } from "../../config/db/db";
import {
  GetUserDTO,
  UpdateUserDTO,
  UserRegistrationDTO,
} from "../../utils/types/user.type";

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

export async function getUserById(id: string): Promise<GetUserDTO | null> {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      userName: true,
      firstName: true,
      email: true,
      role: true,
    },
  });
}

export async function updateUserDetails({
  id,
  data,
}: {
  id: string;
  data: UpdateUserDTO;
}): Promise<GetUserDTO | null> {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
    select: {
      id: true,
      userName: true,
      firstName: true,
      email: true,
      role: true,
    },
  });
}
