import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      name: "Android Phone",
      use: devices["Pixel 7"],
    },
    {
      name: "Android Tablet 7″",
      use: devices["Nexus 7 landscape"],
    },
    {
      name: "Android Tablet 10″",
      use: devices["Galaxy Tab S4 landscape"],
    },
    {
      name: "iPhone 6.5″ Display",
      use: {
        ...devices["iPhone 14 Plus"],
        viewport: {
          height: 926,
          width: 428,
        },
      },
    },
    {
      name: "iPhone 5.5″ Display",
      use: devices["iPhone 8 Plus"],
    },
    {
      name: "iPad 13″ Display",
      use: {
        ...devices["iPad Pro 11 landscape"],
        viewport: {
          height: 1032,
          width: 1376,
        },
      },
    },
    {
      name: "iPad 12.9″ Display",
      use: {
        ...devices["iPad Pro 11 landscape"],
        viewport: {
          height: 1024,
          width: 1366,
        },
      },
    },
    {
      name: "Windows Desktop",
      use: {
        ...devices["Desktop Edge HiDPI"],
        viewport: {
          height: 1080,
          width: 1920,
        },
      },
    },
  ],
  testDir: "tests",
  timeout: 5000,
  use: {
    baseURL: "http://localhost:3000",
  },
});
