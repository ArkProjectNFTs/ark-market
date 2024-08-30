import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

import base from "./base";

const fontSizeMultiplier = 1.1; // Adjust this value to increase or decrease all font sizes

function scaleFontSize(size: string) {
  return `${parseFloat(size) * fontSizeMultiplier}rem`;
}

export default {
  content: base.content,
  presets: [base],
  theme: {
    fontFamily: {
      numbers: ["nitti", ...fontFamily.sans],
      sans: ["degular-text", ...fontFamily.sans],
    },
    fontSize: {
      xs: [scaleFontSize("0.75"), { letterSpacing: "0.05em" }],
      sm: [scaleFontSize("0.875"), { letterSpacing: "0.04em" }],
      base: [scaleFontSize("1"), { letterSpacing: "0.03em" }],
      lg: [scaleFontSize("1.125"), { letterSpacing: "0.025em" }],
      xl: [scaleFontSize("1.25"), { letterSpacing: "0.03em" }],
      "2xl": [scaleFontSize("1.5"), { letterSpacing: "0.03em" }],
      "3xl": [scaleFontSize("1.875"), { letterSpacing: "0.03em" }],
      "4xl": [scaleFontSize("2.25"), { letterSpacing: "0.03em" }],
      "5xl": [scaleFontSize("3"), { letterSpacing: "0.03em" }],
      "6xl": [scaleFontSize("3.75"), { letterSpacing: "0.03em" }],
      "7xl": [scaleFontSize("4.5"), { letterSpacing: "0.03em" }],
      "8xl": [scaleFontSize("6"), { letterSpacing: "0.03em" }],
      "9xl": [scaleFontSize("8"), { letterSpacing: "0.03em" }],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0", opacity: "0" },
          to: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
          },
        },
        "collapsible-up": {
          from: {
            height: "var(--radix-collapsible-content-height)",
            opacity: "1",
          },
          to: { height: "0", opacity: "0" },
        },
      },
      animation: {
        "collapsible-down": "collapsible-down 0.15s ease",
        "collapsible-up": "collapsible-up 0.15s ease",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
