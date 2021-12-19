module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:jest/recommended",
    "plugin:json/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended", // Make sure to put it last, so it gets the chance to override other configs
  ],
  overrides: [
    {
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/typescript",
        "plugin:prettier/recommended", // Make sure to put it last, so it gets the chance to override other configs
      ],
      files: ["**/*.ts?(x)"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "@typescript-eslint/restrict-template-expressions": "error",
      },
    },
    {
      files: ["scripts/**"],
      rules: {
        "no-console": "off",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@emotion", "only-error"],
  rules: {
    "@emotion/syntax-preference": ["error", "string"],
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    "jsx-a11y/no-autofocus": ["error", { ignoreNonDOM: true }],
    "no-console": ["error", { allow: ["error", "warn"] }],
    "no-unused-vars": [
      "error",
      {
        args: "after-used",
        ignoreRestSiblings: true,
        vars: "all",
      },
    ],
    "react/jsx-sort-default-props": "error",
    "react/jsx-sort-props": [
      "error",
      {
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/sort-prop-types": [
      "error",
      {
        ignoreCase: true,
        sortShapeProp: true,
      },
    ],
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "sort-keys": [
      "warn",
      "asc",
      {
        caseSensitive: false,
        natural: true,
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".mjs", ".tsx", ".ts", ".js", ".json"],
      },
    },
    react: {
      version: "detect",
    },
  },
};
