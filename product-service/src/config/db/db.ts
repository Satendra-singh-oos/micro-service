import { PrismaClient } from "@prisma/client";
import env from "../../utils/env";

export const prisma = new PrismaClient({
  datasourceUrl: env.DATABASE_URL,
});

export const connectDb = async () => {
  try {
    console.log(env.DATABASE_URL);
    await prisma.$connect();
    console.log(`Product Service Db Connected 👨‍💻`);
  } catch (error) {
    console.log("Product to connect to Db", error);
    process.exit(1);
  }
};
