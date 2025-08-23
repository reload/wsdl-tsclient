import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores(["test/generated/", "test/resources/", "dist/"]),
    {
        extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
            },

            parser: tsParser,
            ecmaVersion: 12,
            sourceType: "module",
        },

        rules: {
            "prettier/prettier": "warn",
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-unused-vars": 0,
            "@typescript-eslint/no-var-requires": 0,
            "@typescript-eslint/ban-types": 0,
            "@typescript-eslint/no-namespace": 0,
            "@typescript-eslint/explicit-module-boundary-types": 0,
            "@typescript-eslint/no-empty-interface": 0,
        },
    },
]);
