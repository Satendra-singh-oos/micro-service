import { Category } from "@prisma/client";
import {
  CreateCategoryDTO,
  GetAllCategoryDTO,
} from "../../utils/types/product.type";
import { prisma } from "../../config/db/db";

export const addCategory = async (
  data: CreateCategoryDTO
): Promise<Category> => {
  return await prisma.category.create({
    data: {
      label: data.label,
      value: data.value,
    },
  });
};

export const getCategoryById = async (id: string): Promise<Category | null> => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

export const getAllCategory = async (): Promise<GetAllCategoryDTO[]> => {
  return await prisma.category.findMany({
    select: {
      id: true,
      value: true,
      label: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getCategoryByLabel = async (
  label: string
): Promise<Category | null> => {
  return await prisma.category.findUnique({
    where: { label },
  });
};

export const getCategoryByValue = async (
  value: string
): Promise<Category | null> => {
  return await prisma.category.findUnique({
    where: { value },
  });
};
