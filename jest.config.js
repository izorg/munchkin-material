/** @type {import('jest').Config} */
const config = {
  roots: ["<rootDir>/web/src/"],
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
};

export default config;
