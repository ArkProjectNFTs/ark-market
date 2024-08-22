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
      h1: "text-5xl font-bold",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-semibold",
      h4: "text-xl font-semibold",

      body_s: "text-sm font-medium",
      body_bold_s: "text-base font-medium",
      body_m: "text-lg font-normal",
      body_bold_m: isUnframed
        ? "text-[1.1875rem] font-semibold"
        : "text-lg font-semibold",

      button_text_s: "text-sm font-semibold",
      button_text_m: "text-base font-semibold",
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
