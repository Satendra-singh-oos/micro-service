import { PrismaClient } from "@prisma/client";
import env from "../../utils/env";

export const prisma = new PrismaClient({
  datasourceUrl: env.DATABASE_URL,
});

export const connectDb = async () => {
  try {
    await prisma.$connect();
    console.log(`Order Service Db Connected 👨‍💻`);
  } catch (error) {
    console.log("Unable to connect to Db", error);
    process.exit(1);
  }
};
