import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import formatjs from "eslint-plugin-formatjs";
import onlyError from "eslint-plugin-only-error";
import globals from "globals";
import ts from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default ts.config(
  {
    ignores: [
      "**/.next/",
      "**/coverage/",
      ".idea/",
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
  ...fixupConfigRules(
    compat.extends(
      "plugin:compat/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:jest/recommended",
      "plugin:json/recommended-legacy",
      "plugin:jsx-a11y/recommended",
      "plugin:perfectionist/recommended-alphabetical-legacy",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "plugin:sonarjs/recommended-legacy",
      "plugin:unicorn/recommended",
      "plugin:prettier/recommended",
    ),
  ),
  {
    languageOptions: {
      ecmaVersion: 5,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },

      sourceType: "script",
    },

    plugins: {
      formatjs: fixupPluginRules(formatjs),
      "only-error": onlyError,
    },

    rules: {
      "formatjs/enforce-id": [
        "error",
        {
          idInterpolationPattern: "[sha512:contenthash:base64:6]",
        },
      ],

      "formatjs/no-invalid-icu": "error",

      "import/consistent-type-specifier-style": ["error", "prefer-inline"],
      "import/default": "off",
      "import/namespace": "off",
      "import/no-cycle": "error",
      "import/no-named-as-default": "off",
      "import/no-named-as-default-member": "off",

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

          internalPattern: ["@munchkin/**"],
        },
      ],

      "react/prop-types": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-instanceof-array": "off",
      "unicorn/no-null": "off",
      "unicorn/prevent-abbreviations": "off",
    },

    settings: {
      "import/resolver": {
        node: true,

        typescript: {
          project: ["packages/*/tsconfig.json", "tsconfig.json"],
        },
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
    files: ["**/scripts/**", "**/next.config.js"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.json"],

    languageOptions: {
      ecmaVersion: 5,
      parserOptions: {
        project: null,
      },

      sourceType: "script",
    },
  },
  {
    files: ["packages/cordova/**/*", "packages/web/**/*"],

    settings: {
      polyfills: ["Intl", "Object.fromEntries"],
    },
  },
  {
    files: ["packages/site/**/*"],
    plugins: {
      "@next/next": fixupPluginRules(next),
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
);
