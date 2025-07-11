import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { ZodError, z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.string().default("8001"),
  DATABASE_URL: z.string().min(1),
  CORS_ORIGIN_URL: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(1),
  REDIS_HOST: z.string().min(1),
  REDIS_PASSWORD: z.string(),
  REDIS_PORT: z.string().min(1),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = "Missing required values in .env:\n";
    error.issues.forEach((issue) => {
      message += issue.path[0] + "\n";
    });

    const e = new Error(message);
    e.stack = "";
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
