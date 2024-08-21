import type { VariantProps } from "class-variance-authority";
import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from ".";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const isUnframed = process.env.NEXT_PUBLIC_THEME === "unframed";

const typographyVariants = cva("", {
  variants: {
    variant: {
      body_m: "",
      body_bold_m: isUnframed
        ? "text-[1.1875rem] font-semibold"
        : "text-lg font-semibold",

      button_text_s: "text-xs font-semibold",
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
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ asChild, variant, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "p";
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

export { Typography, typographyVariants };
