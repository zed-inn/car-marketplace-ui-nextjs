import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  APP_URL: z.string().url("APP_URL must be a valid url"),
});

function getAppUrl(): string {
  if (process.env.APP_URL) {
    return process.env.APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const _env = EnvSchema.safeParse({
  ...process.env,
  APP_URL: getAppUrl(),
});

if (!_env.success) {
  console.error("Invalid environment variables:\n", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
