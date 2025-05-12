import globals from 'globals';
import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
import tsParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';

// Fix: Use default import for CommonJS module and destructure configs
const { configs: tsConfigs } = tsEslintPlugin;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

// ESLint FlatConfig expects an array of config objects
export default [
  {
    ignores: [
      'greenova/media/**/*',
      'greenova/staticfiles/**/*',
      'greenova/logs/**/*',
      'node_modules/**/*',
      '.venv/**',
      '.vscode/**/*',
      'dist/**/*',
      'vendor/**',
      'scripts/*.js',
      'scripts/**/*.js',
      'greenova/static/js/**/*',
      'greenova/static/as/**/*',
      'greenova/static/ts/dist/**/*',
      'greenova/static/js/vendors/**/*',
      'greenova/theme/static_src/tailwind.config.js',
      './webpack.config.js',
      './postcss.config.js',
      './stylelint.config.js',
      './eslint.config.js',
      './tailwind.config.js',
      './*.config.js', // Only root config files
      // Do NOT ignore greenova/static/ts/src/**/* (main TS source)
    ],
  },
  ...compat.extends('eslint:recommended', 'plugin:prettier/recommended'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: 2024,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslintPlugin,
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prettier/prettier': ['error', { singleQuote: true }],
      ...tsConfigs.recommended.rules,
    },
    settings: {
      fix: true,
    },
  },
];
