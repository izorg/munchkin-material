import { type Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/packages/web/src/"],
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
};

export default config;
