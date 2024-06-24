import baseConfig, { restrictEnvAccess } from "@ark-market/eslint-config/base";
import nextjsConfig from "@ark-market/eslint-config/nextjs";
import reactConfig from "@ark-market/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
