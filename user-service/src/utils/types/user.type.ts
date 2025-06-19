import { Role } from "@prisma/client";

export interface UserRegistrationDTO {
  userName: string;
  fullName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface GetUserDTO {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  userName: string;
  role: Role;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  role?: Role;
}
