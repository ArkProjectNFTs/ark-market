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
    NEXT_PUBLIC_NFT_API_URL: z.string().url(),
    NEXT_PUBLIC_NFT_API_KEY: z.string(),
    NEXT_PUBLIC_BROKER_ID: z.string(),
  },
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_NFT_API_KEY: process.env.NEXT_PUBLIC_NFT_API_KEY,
    NEXT_PUBLIC_ORDERBOOK_API_URL: process.env.NEXT_PUBLIC_ORDERBOOK_API_URL,
    NEXT_PUBLIC_NFT_API_URL: process.env.NEXT_PUBLIC_NFT_API_URL,
    NEXT_PUBLIC_MARKETPLACE_API_URL:
      process.env.NEXT_PUBLIC_MARKETPLACE_API_URL,
    NEXT_PUBLIC_BROKER_ID: process.env.NEXT_PUBLIC_BROKER_ID,

    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
});