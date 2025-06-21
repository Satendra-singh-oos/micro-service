export interface CreateProductDTO {
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  discountPrice?: number;
  categoryId: string;
  createdById: string;
}

export interface CreateCategoryDTO {
  label: string;
  value: string;
}

export interface GetProductDTO {
  deleted: boolean;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number | null;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  discountPrice?: number | null;
  category: {
    id: string;
    label: string;
    value: string;
  };
}

export interface GetAllProductDTO {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
  brand: string;
  category: {
    id: string;
    label: string;
    value: string;
  };
}

export interface GetAllCategoryDTO {
  id: string;
  label: string;
  value: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
