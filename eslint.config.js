import js from "@eslint/js";
import json from "@eslint/json";
import next from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
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
import ts from "typescript-eslint";

/**
 * Run `npx @eslint/config-inspector` to visualise the config
 */
export default ts.config(
  gitignore(),
  {
    ignores: [".yarn/", "packages/windows/Munchkin/"],
    name: "Global",
    plugins: {
      "only-error": onlyError,
    },
  },
  {
    extends: [
      js.configs.recommended,
      ts.configs.recommendedTypeChecked,
      compat.configs["flat/recommended"],
      formatjs.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      jsxA11y.flatConfigs.recommended,
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      reactHooks.configs["recommended-latest"],
      unicorn.configs.recommended,
      perfectionist.configs["recommended-alphabetical"],
    ],
    files: ["**/*.js", "**/*.ts?(x)"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    name: "JavaScript & TypeScript",
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

      "unicorn/filename-case": [
        "error",
        {
          cases: {
            camelCase: true,
            kebabCase: true,
            pascalCase: true,
          },
        },
      ],

      /**
       * Conflicts with TypeScript checks for `sx` prop
       */
      "unicorn/no-instanceof-builtins": "off",

      "unicorn/no-null": "off",

      /**
       * Conflicts with SonarCloud https://rules.sonarsource.com/typescript/tag/clumsy/RSPEC-3626/ and
       * TypeScript noImplicitReturns https://www.typescriptlang.org/tsconfig/#noImplicitReturns.
       */
      "unicorn/no-useless-undefined": "off",

      /**
       * Browser & Node.js API types could be different (example `setTimeout`)
       */
      "unicorn/prefer-global-this": "off",

      "unicorn/prevent-abbreviations": [
        "error",
        {
          replacements: {
            ctx: false,
            dir: false,
            el: false,
            env: false,
            obj: false,
            params: false,
            prev: false,
            prop: false,
            props: false,
            ref: false,
          },
        },
      ],
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
    extends: [ts.configs.disableTypeChecked],
    files: ["**/*.js"],
    name: "JavaScript",
  },
  {
    files: ["**/*.ts?(x)"],
    name: "TypeScript",
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
    extends: [jest.configs["flat/recommended"]],
    files: ["**/*.spec.ts?(x)"],
    name: "Jest",
  },
  {
    files: ["**/scripts/**", "**/next.config.ts"],
    languageOptions: {
      globals: globals.node,
    },
    name: "Scripts",
  },
  {
    extends: [json.configs.recommended],
    files: ["**/*.json"],
    language: "json/json",
    name: "JSON",
  },
  {
    files: ["packages/cordova/**", "packages/web/**"],
    name: "Cordova & Web",
    settings: {
      polyfills: ["Object.fromEntries"],
    },
  },
  {
    files: ["packages/site/**"],
    name: "Site",
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
  {
    extends: [prettier],
    name: "Prettier",
  },
);
