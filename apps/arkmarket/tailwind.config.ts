import type { Config } from "tailwindcss";

import native from "@ark-market/tailwind-config/native";
import unframed from "@ark-market/tailwind-config/unframed";

const theme = process.env.NEXT_PUBLIC_THEME === "unframed" ? unframed : native

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...theme.content, "../../packages/ui/**/*.{ts,tsx}"],
  presets: [theme],
} satisfies Config;
