import { Product } from "@prisma/client";
import { prisma } from "../../config/db/db";
import {
  CreateProductDTO,
  GetAllProductDTO,
  GetProductDTO,
} from "../../utils/types/product.type";

export const addProduct = async (data: CreateProductDTO): Promise<Product> => {
  return await prisma.product.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      discountPercentage: data.discountPercentage,
      rating: data.rating ?? 0,
      stock: data.stock ?? 0,
      brand: data.brand,
      thumbnail: data.thumbnail,
      images: data.images,
      discountPrice: data.discountPrice,
      categoryId: data.categoryId,
      createdById: data.createdById,
    },
  });
};

export const getProductByName = async (
  title: string
): Promise<Product | null> => {
  return prisma.product.findUnique({
    where: {
      title,
    },
  });
};

export const getProductById = async (
  id: string
): Promise<GetProductDTO | null> => {
  return await prisma.product.findFirst({
    where: { id },
    select: {
      title: true,
      description: true,
      price: true,
      discountPercentage: true,
      rating: true,
      stock: true,
      brand: true,
      thumbnail: true,
      images: true,
      discountPrice: true,
      deleted: true,
      category: {
        select: {
          id: true,
          label: true,
          value: true,
        },
      },
    },
  });
};

// TODO:ADD PAGINATION
export const getAllProduct = async (): Promise<GetAllProductDTO[]> => {
  return await prisma.product.findMany({
    where: {
      deleted: false,
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      stock: true,
      brand: true,
      thumbnail: true,
      category: {
        select: {
          id: true,
          label: true,
          value: true,
        },
      },
    },
  });
};

export const softDeleteProduct = async (id: string): Promise<Product> => {
  return await prisma.product.update({
    where: {
      id,
    },
    data: {
      deleted: true,
    },
  });
};
