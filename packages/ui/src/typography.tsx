import type { VariantProps } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn, ellipsableStyles } from ".";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isUnframed = process.env.NEXT_PUBLIC_THEME === "unframed";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: isUnframed ? "text-[3.4375rem] font-bold" : "text-5xl font-bold",
      h2: isUnframed ? "text-4xl font-semibold" : "text-3xl font-semibold",
      h3: isUnframed
        ? "text-[1.6875rem] font-semibold"
        : "text-2xl font-semibold",
      h4: isUnframed
        ? "text-[1.4375rem] font-semibold"
        : "text-xl font-semibold",

      body_s: isUnframed ? "text-base font-medium" : "text-sm font-medium",
      body_bold_s: isUnframed
        ? "text-base font-semibold"
        : "text-base font-medium",
      body_m: isUnframed
        ? "text-[1.1875rem] font-medium"
        : "text-lg font-normal",
      body_bold_m: isUnframed
        ? "text-[1.1875rem] font-semibold"
        : "text-lg font-semibold",

      button_text_s: isUnframed
        ? "text-[1.0625rem] font-semibold"
        : "text-sm font-semibold",
      button_text_m: isUnframed
        ? "text-[1.1875rem] font-semibold"
        : "text-base font-semibold",

      number_l: isUnframed
        ? "font-[Nitti] text-2xl font-normal"
        : "text-2xl font-medium",
    },
  },
  defaultVariants: {
    variant: "body_m",
  },
});

export interface TypographyProps
  extends React.ParamHTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  ellipsable?: boolean;
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ asChild, variant, className, ellipsable, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        className={cn(
          typographyVariants({ variant, className }),
          ellipsable && ellipsableStyles,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export { Typography, typographyVariants };
