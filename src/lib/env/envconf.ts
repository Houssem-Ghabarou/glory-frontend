// lib/envconf.ts

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name];
  if (!value && fallback === undefined) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value ?? fallback!;
}

function getOptionalEnv(name: string): string | undefined {
  return process.env[name];
}

function getBooleanEnv(name: string, fallback = false): boolean {
  const val = process.env[name];
  if (val === undefined) return fallback;
  return val === "true" || val === "1";
}

function getNumberEnv(name: string, fallback?: number): number {
  const val = process.env[name];
  if (val === undefined && fallback === undefined) {
    throw new Error(`Missing numeric env variable: ${name}`);
  }
  const parsed = Number(val);
  if (isNaN(parsed)) {
    throw new Error(`Invalid number for env variable: ${name}`);
  }
  return parsed;
}

export const envconf = {
  NODE_ENV: getEnv("NODE_ENV", "development"),
  API_URL: getEnv("NEXT_PUBLIC_API_URL"),
  DATABASE_URL: getEnv("DATABASE_URL"),
  ENABLE_FEATURE_X: getBooleanEnv("ENABLE_FEATURE_X", false),
  PORT: getNumberEnv("PORT", 3000),
  OPTIONAL_SECRET: getOptionalEnv("OPTIONAL_SECRET"),
};
