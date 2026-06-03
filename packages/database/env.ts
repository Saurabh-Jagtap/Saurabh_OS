import { z } from "zod";

console.log("DATABASE_URL =", process.env.DATABASE_URL);
console.log("cwd =", process.cwd());

const envSchema = z.object({
  DATABASE_URL: z.string().describe("DB URL"),
});

function createEnv(env: NodeJS.ProcessEnv) {
  const safeParseResult = envSchema.safeParse(env);
  if (!safeParseResult.success) throw new Error(safeParseResult.error.message);
  return safeParseResult.data;
}

export const env = createEnv(process.env);
