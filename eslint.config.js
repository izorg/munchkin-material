import js from "@eslint/js";
import json from "@eslint/json";
import next from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import compat from "eslint-plugin-compat";
import formatjs from "eslint-plugin-formatjs";
import importPlugin from "eslint-plugin-import";
import jest from "eslint-plugin-jest";
import jsxA11y from "eslint-plugin-jsx-a11y";
import onlyError from "eslint-plugin-only-error";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import unicorn from "eslint-plugin-unicorn";
import globals from "globals";
import * as ts from "typescript-eslint";

export default ts.config(
  {
    ignores: [
      "**/.next/",
      "**/coverage/",
      ".idea/",
      ".parcel-cache/",
      ".vscode/",
      ".yarn/",
      "packages/cordova/platforms/",
      "packages/cordova/plugins/",
      "packages/cordova/www/",
      "packages/site/out/",
      "packages/web/dist/",
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommendedTypeChecked,
  compat.configs["flat/recommended"],
  formatjs.configs.recommended,
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  jsxA11y.flatConfigs.recommended,
  perfectionist.configs["recommended-alphabetical"],
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  unicorn.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
      sourceType: "script",
    },
    plugins: {
      "only-error": onlyError,
      "react-hooks": reactHooks,
    },
    rules: {
      "@typescript-eslint/consistent-return": "off",

      "formatjs/enforce-description": "off",
      "formatjs/enforce-id": [
        "error",
        {
          idInterpolationPattern: "[sha512:contenthash:base64:6]",
        },
      ],
      "formatjs/no-invalid-icu": "error",
      "formatjs/no-literal-string-in-jsx": "off",

      "import/consistent-type-specifier-style": ["error", "prefer-inline"],

      /**
       * https://typescript-eslint.io/troubleshooting/typed-linting/performance#eslint-plugin-import
       */
      "import/default": "off",
      "import/namespace": "off",
      "import/no-named-as-default-member": "off",
      "import/no-unresolved": "off",

      "jsx-a11y/no-autofocus": [
        "error",
        {
          ignoreNonDOM: true,
        },
      ],

      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "builtin",
            "side-effect",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
        },
      ],
      "perfectionist/sort-modules": "off",

      ...reactHooks.configs.recommended.rules,

      "unicorn/filename-case": "off",

      /**
       * Conflicts with TypeScript checks for `sx` prop
       */
      "unicorn/no-instanceof-array": "off",

      "unicorn/no-null": "off",
      "unicorn/no-useless-undefined": "off",
      "unicorn/prefer-global-this": "off",
      "unicorn/prevent-abbreviations": "off",
    },

    settings: {
      "import/resolver": {
        node: true,
        typescript: true,
      },
      lintAllEsApis: true,
      react: {
        version: "detect",
      },
    },
  },
  {
    ...ts.configs.disableTypeChecked,
    files: ["**/*.js"],
  },
  {
    files: ["**/*.ts?(x)"],
    rules: {
      "@typescript-eslint/consistent-type-exports": [
        "error",
        {
          fixMixedExportsWithInlineTypeSpecifier: true,
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          fixStyle: "inline-type-imports",
          prefer: "type-imports",
        },
      ],

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
    },
  },
  {
    ...jest.configs["flat/recommended"],
    files: ["**/*.spec.ts?(x)"],
  },
  {
    files: ["**/scripts/**", "**/next.config.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ...json.configs.recommended,
    files: ["**/*.json"],
    language: "json/json",
  },
  {
    files: ["packages/cordova/**", "packages/web/**"],
    settings: {
      polyfills: ["Object.fromEntries"],
    },
  },
  {
    files: ["packages/site/**"],
    plugins: {
      "@next/next": next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
    settings: {
      next: {
        rootDir: "packages/site",
      },
    },
  },
  prettier,
);
