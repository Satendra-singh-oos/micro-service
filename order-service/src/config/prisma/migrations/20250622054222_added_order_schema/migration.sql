-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderById" TEXT NOT NULL,
    "orderByEmail" TEXT,
    "productIds" TEXT[],
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "ORDER_STATUS" NOT NULL DEFAULT 'PENDING',
    "addressId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
