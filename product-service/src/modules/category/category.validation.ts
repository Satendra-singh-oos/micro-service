import { z } from "zod";

export const createCategorySchema = z.object({
  body: z
    .object({
      label: z.string().trim().min(1).max(50),
      value: z.string().trim().min(1).max(50),
    })
    .strict(),
});
