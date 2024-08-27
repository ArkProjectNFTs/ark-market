import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

import baseConfig from "@ark-market/tailwind-config/web";

export default {
  // We need to append the path to the UI package to the content array so that
  // those classes are included correctly.
  content: [...baseConfig.content, "../../packages/ui/src/**/*.{ts,tsx}"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        numbers: [
          process.env.NEXT_PUBLIC_THEME === "unframed"
            ? "nitti"
            : "var(--font-inter-sans)",
          ...fontFamily.sans,
        ],
        sans: [
          process.env.NEXT_PUBLIC_THEME === "unframed"
            ? "degular"
            : "var(--font-inter-sans)",
          ...fontFamily.sans,
        ],
      },
    },
  },
} satisfies Config;
