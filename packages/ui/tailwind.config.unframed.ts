import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { fontFamily } from "tailwindcss/defaultTheme";

import base from "@ark-market/tailwind-config/base";

const fontSizeMultiplier = 1.15; // Adjust this value to increase or decrease all font sizes

function scaleFontSize(size: string) {
  return `${parseFloat(size) * fontSizeMultiplier}rem`;
}

export default {
  content: base.content,
  presets: [base],
  theme: {
    colors: {
      primary: 'hsl(var(--primary))',
    },
    fontFamily: {
      numbers: ["nitti", ...fontFamily.sans],
      sans: ["degular",...fontFamily.sans],
    },
    fontSize: {
        xs: [scaleFontSize("0.75"), { lineHeight: '1.3', letterSpacing: '0.05em', fontWeight: '400' }],
        sm: [scaleFontSize("0.875"), { lineHeight: '1.4', letterSpacing: '0.04em', fontWeight: '400' }],
        base: [scaleFontSize("1"), { lineHeight: '1.4', letterSpacing: '0.03em', fontWeight: '400' }],
        lg: [scaleFontSize("1.125"), { lineHeight: '1.3', letterSpacing: '0.025em', fontWeight: '400' }],
        xl: [scaleFontSize("1.25"), { lineHeight: '1.27', letterSpacing: '0.03em', fontWeight: '400' }],
        "2xl": [scaleFontSize("1.5"), { lineHeight: '1', letterSpacing: '0.035em', fontWeight: '500' }],
        "3xl": [scaleFontSize("1.875"), { lineHeight: '1', letterSpacing: '0.04em', fontWeight: '700' }],
        "4xl": [scaleFontSize("2.25"), { lineHeight: '1', letterSpacing: '0.045em', fontWeight: '700' }],
        "5xl": [scaleFontSize("3"), { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '800' }],
        "6xl": [scaleFontSize("3.75"), { lineHeight: '1', letterSpacing: '0.055em', fontWeight: '800' }],
        "7xl": [scaleFontSize("4.5"), { lineHeight: '1', letterSpacing: '0.06em', fontWeight: '800' }],
        "8xl": [scaleFontSize("6"), { lineHeight: '1', letterSpacing: '0.065em', fontWeight: '800' }],
        "9xl": [scaleFontSize("8"), { lineHeight: '1', letterSpacing: '0.07em', fontWeight: '800' }],
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
      }
    },
  },
  plugins: [animate],
} satisfies Config;
