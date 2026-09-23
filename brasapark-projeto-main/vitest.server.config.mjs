import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/server/**/*.test.ts"],
    fileParallelism: false,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "coverage/server",
      include: ["src/{utils,schemas,middleware,controllers,services,routes}/**/*.ts"],
      thresholds: { lines: 55, statements: 55, functions: 45, branches: 45 }
    }
  }
});
