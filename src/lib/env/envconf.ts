// lib/envconf.ts

function getEnv(name: string, fallback = ""): string {
  const value = process.env[name];
  return value ?? fallback;
}

function getOptionalEnv(name: string): string | undefined {
  return process.env[name];
}

function getBooleanEnv(name: string, fallback = false): boolean {
  const val = process.env[name];
  if (val === undefined) return fallback;
  return val === "true" || val === "1";
}

function getNumberEnv(name: string, fallback = 0): number {
  const val = process.env[name];
  if (val === undefined) return fallback;
  const parsed = Number(val);
  if (isNaN(parsed)) {
    return fallback;
  }
  return parsed;
}

export const envconf = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  API_URL: getEnv("NEXT_PUBLIC_API_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  ENABLE_FEATURE_X: getBooleanEnv("ENABLE_FEATURE_X", false),
  PORT: getNumberEnv("PORT", 3000),
  OPTIONAL_SECRET: getOptionalEnv("OPTIONAL_SECRET"),
  sanityToken: getEnv("NEXT_PUBLIC_SANITY_API_READ_TOKEN"),
};
