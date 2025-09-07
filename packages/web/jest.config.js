/**
 * @type {import('jest').Config}
 */
const config = {
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  roots: ["<rootDir>/src/"],
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
};

export default config;
