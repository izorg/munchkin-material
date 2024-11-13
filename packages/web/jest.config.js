/**
 * @type {import('jest').Config}
 */
const config = {
  roots: ["<rootDir>/src/"],
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
};

export default config;
