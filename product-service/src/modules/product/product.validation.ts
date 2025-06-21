import { z } from "zod";

export const createProductSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(1).max(100),
      description: z.string().trim().min(1).max(1000),
      price: z.number().positive(),
      discountPercentage: z.number().min(0).max(100).optional(),
      rating: z.number().min(0).max(5),
      stock: z.number().min(0),
      brand: z.string().trim().min(1).max(100),
      thumbnail: z.string().url(),
      images: z.array(z.string().url()).min(1),
      discountPrice: z.number().positive().optional(),
      categoryId: z.string().trim().min(1),
      createdById: z.string().trim().min(1),
    })
    .strict(),
});

export const deleteProductSchema = z.object({
  params: z
    .object({
      id: z.string(),
    })
    .strict(),
});

export const getProductByIdSchema = z.object({
  params: z
    .object({
      id: z.string().uuid(),
    })
    .strict(),
});
