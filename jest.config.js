/** @type {import('jest').Config} */
const config = {
  roots: ["<rootDir>/packages/web/src/"],
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
};

export default config;
