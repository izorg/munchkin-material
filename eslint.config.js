import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import { fixupConfigRules } from "@eslint/compat";
import css from "@eslint/css";
import js from "@eslint/js";
import json from "@eslint/json";
import html from "@html-eslint/eslint-plugin";
import next from "@next/eslint-plugin-next";
import gitignore from "eslint-config-flat-gitignore";
import prettier from "eslint-config-prettier/flat";
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
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

/**
 * Run `yarn dlx @eslint/config-inspector` to visualise the config
 */
export default defineConfig(
  gitignore(),
  globalIgnores(
    [".yarn/", "packages/site/next-env.d.ts", "packages/windows/Munchkin/"],
    "global-ignores",
  ),
  {
    name: "global-setup",
    plugins: {
      "only-error": onlyError,
    },
  },
  {
    extends: [
      js.configs.recommended,
      ts.configs.recommendedTypeChecked,
      comments.recommended,
      formatjs.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      jsxA11y.flatConfigs.recommended,
      perfectionist.configs["recommended-alphabetical"],
      fixupConfigRules(react.configs.flat.recommended),
      fixupConfigRules(react.configs.flat["jsx-runtime"]),
      reactHooks.configs.flat["recommended-latest"],
      unicorn.configs.recommended,
    ],
    files: ["**/*.js", "**/*.ts?(x)"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    name: "javascript-and-typescript",
    rules: {
      "@eslint-community/eslint-comments/require-description": [
        "error",
        {
          ignore: ["eslint-enable"],
        },
      ],

      "formatjs/enforce-description": "off",

      "formatjs/enforce-id": [
        "error",
        {
          idInterpolationPattern: "[sha512:contenthash:base64:6]",
        },
      ],

      "formatjs/no-invalid-icu": "error",

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
          customGroups: [
            {
              elementNamePattern: ["^@munchkin/"],
              groupName: "workspace",
              modifiers: ["named"],
            },
          ],
          groups: [
            "builtin",
            "side-effect",
            "external",
            "internal",
            "workspace",
            "parent",
            "sibling",
            "index",
          ],
        },
      ],

      "unicorn/consistent-boolean-name": "off",

      "unicorn/default-export-style": "off",

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

      "unicorn/name-replacements": [
        "error",
        {
          replacements: {
            ctx: false,
            dev: false,
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

      "unicorn/no-null": "off",

      "unicorn/no-top-level-assignment-in-function": "off",

      "unicorn/no-top-level-side-effects": "off",

      /**
       * Conflicts with SonarCloud https://rules.sonarsource.com/typescript/tag/clumsy/RSPEC-3626/ and
       * TypeScript noImplicitReturns https://www.typescriptlang.org/tsconfig/#noImplicitReturns.
       */
      "unicorn/no-useless-undefined": "off",

      "unicorn/prefer-ternary": "off",
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
    name: "javascript",
  },
  {
    files: ["**/*.ts?(x)"],
    name: "typescript",
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
    extends: [css.configs.recommended],
    files: ["**/*.css"],
    language: "css/css",
    name: "css",
    rules: {
      "css/no-invalid-at-rules": "off",
      "css/use-baseline": "off",
    },
  },
  {
    extends: [html.configs.recommended],
    files: ["**/*.html"],
    language: "html/html",
    name: "html",
    rules: {
      "html/indent": ["error", 2],
      "html/no-extra-spacing-tags": [
        "error",
        {
          enforceBeforeSelfClose: true,
        },
      ],
      "html/require-closing-tags": [
        "error",
        {
          selfClosing: "always",
        },
      ],
      "html/use-baseline": "off",
    },
  },
  {
    files: ["**/*.d.ts"],
    name: "typescript-declarations",
    rules: {
      "unicorn/require-module-specifiers": "off",
    },
  },
  {
    extends: [jest.configs["flat/recommended"]],
    files: ["**/*.spec.ts?(x)"],
    name: "jest",
    rules: {
      "unicorn/max-nested-calls": "off",
    },
  },
  {
    files: ["**/tests/*.test.ts"],
    name: "playwright",
    rules: {
      "unicorn/max-nested-calls": "off",
    },
  },
  {
    files: ["**/scripts/**", "**/next.config.ts"],
    languageOptions: {
      globals: globals.node,
    },
    name: "scripts",
  },
  {
    extends: [json.configs.recommended],
    files: ["**/*.json"],
    language: "json/json",
    name: "json",
  },
  {
    extends: [
      compat.configs["flat/recommended"],
      next.configs.recommended,
      next.configs["core-web-vitals"],
    ],
    files: ["packages/site/**"],
    name: "site",
    settings: {
      next: {
        rootDir: "packages/site",
      },
    },
  },
  prettier,
);
