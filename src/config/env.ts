import { z } from "zod";
import { InvalidResourceError } from "../errors/invalid-resource.error";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SERVER_PORT: z.coerce.number().int().positive().default(3333),
  API_BASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  ENVIRONMENT: z.enum(["dev", "test", "production"]).default("dev")
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  throw new InvalidResourceError(`Invalid env validation. ${_env.error.flatten}`);
}

const env = _env.data;

if (env.ENVIRONMENT === "dev") {
  env.API_BASE_URL = `http://localhost:${env.SERVER_PORT}`;
}

export { env };
