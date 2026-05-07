import { type Config } from "jest";

const config: Config = {
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  roots: ["<rootDir>/src/"],
  transform: {
    "^.+\\.tsx?$": [
      "@swc/jest",
      {
        jsc: {
          experimental: {
            keepImportAssertions: true,
          },
        },
      },
    ],
  },
};

export default config;
