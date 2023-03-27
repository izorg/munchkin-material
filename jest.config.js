/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  preset: "ts-jest",
  roots: ["<rootDir>/web/src/"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        isolatedModules: true,
      },
    ],
  },
};

export default config;
