/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  extends: [],
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
  },
  /**
   * Specify your server-side environment variables schema here.
   * This way you can ensure the app isn't built with invalid env vars.
   */
  server: {},
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_ORDERBOOK_API_URL: z.string().url(),
    NEXT_PUBLIC_MARKETPLACE_API_URL: z.string().url(),
    NEXT_PUBLIC_BROKER_ID: z.string(),
    NEXT_PUBLIC_IPFS_GATEWAY: z.string().url(),
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string(),
    NEXT_PUBLIC_IMAGE_CDN_URL: z.string().url(),
    NEXT_PUBLIC_IMAGE_PROXY_URL: z.string().url(),
    NEXT_PUBLIC_THEME: z.enum(["unframed", "default"]),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ORDERBOOK_API_URL: process.env.NEXT_PUBLIC_ORDERBOOK_API_URL,
    NEXT_PUBLIC_MARKETPLACE_API_URL:
      process.env.NEXT_PUBLIC_MARKETPLACE_API_URL,
    NEXT_PUBLIC_BROKER_ID: process.env.NEXT_PUBLIC_BROKER_ID,
    NEXT_PUBLIC_IPFS_GATEWAY: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
    NEXT_PUBLIC_IMAGE_CDN_URL: process.env.NEXT_PUBLIC_IMAGE_CDN_URL,
    NEXT_PUBLIC_IMAGE_PROXY_URL: process.env.NEXT_PUBLIC_IMAGE_PROXY_URL,
    NEXT_PUBLIC_THEME: process.env.NEXT_PUBLIC_THEME,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});
