import baseConfig from "@ark-market/eslint-config/base";
import reactConfig from "@ark-market/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
