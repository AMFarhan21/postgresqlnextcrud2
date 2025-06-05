import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
   // Next.js + TypeScript preset from compat layer
  ...compat.extends('next/core-web-vitals', 'next'),

  // TypeScript config
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        project: true,
      },
    },
    plugins: {
      '@typescript-eslint': pluginTs,
      react: pluginReact,
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-this-alias': 'off',
    },
  },

  // Optional: JS fallback config
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
  },
  
];

export default eslintConfig;
