import { Role } from "@prisma/client";
import { z } from "zod";

export const registerUserSchema = z.object({
  body: z
    .object({
      userName: z
        .string()
        .trim()
        .min(3)
        .max(50)
        .regex(/^[a-zA-Z0-9_]+$/, {
          message:
            "Username must contain only letters, numbers, or underscores",
        }),

      firstName: z
        .string()
        .trim()
        .min(3)
        .max(50)
        .regex(/^[A-Za-z]+$/, {
          message: "First name must contain only letters",
        })
        .optional(),

      lastName: z
        .string()
        .trim()
        .min(3)
        .max(50)
        .regex(/^[A-Za-z]+$/, {
          message: "Last name must contain only letters",
        })
        .optional(),

      email: z.string().email().trim(),

      password: z
        .string()
        .trim()
        .min(4)
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{4,}$/, {
          message:
            "Password must be at least 4 characters and include at least one letter and one number",
        }),
    })
    .strict(),
});

export const loginUserSchema = z.object({
  body: z
    .object({
      email: z.string().email().trim(),

      password: z.string().trim(),
    })
    .strict(),
});

export const getUserSchema = z.object({
  params: z
    .object({
      id: z.string().uuid().trim(),
    })
    .strict(),
});

export const updateUserRoleSchema = z.object({
  params: z
    .object({
      id: z.string().uuid().trim(),
    })
    .strict(),

  body: z.object({ role: z.nativeEnum(Role) }).strict(),
});
