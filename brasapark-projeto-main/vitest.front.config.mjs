import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/frontend/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      reportsDirectory: "coverage/frontend",
      include: ["frontend/js/api.js"],
      thresholds: { lines: 80, statements: 80, functions: 75, branches: 70 }
    }
  }
});
