import { defineConfig, devices } from "@playwright/test";
import { localhost } from "./check.config";

export default defineConfig({
  testDir: "check",
  testMatch: "check.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { outputFolder: "check/report" }]],
  use: {
    actionTimeout: 0,
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm start",
    url: localhost,
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
  // projects: [
  //   { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  //   // { name: "webkit", use: { ...devices["Desktop Safari"] } },
  //   { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  //   // { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
  //   { name: "Mobile Safari", use: { ...devices["iPhone 14"] } },
  // ],
});
