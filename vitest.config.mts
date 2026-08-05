import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": rootDir,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: true,
    include: ["**/*.{test,spec}.{ts,tsx}"],
    pool: "forks",
    maxWorkers: 2,
    fileParallelism: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "./coverage",
      include: ["components/**/*.{ts,tsx}"],
      exclude: [
        "components/**/*.test.{ts,tsx}",
        "components/**/*.spec.{ts,tsx}",
        "components/__tests__/**",
        "components/ui-types.ts",
      ],
      all: true,
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 50,
        statements: 50,
      },
    },
  },
});
