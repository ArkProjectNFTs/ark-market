import * as React from "react";

import { cn } from "@ark-market/ui";

interface InputStatus {
  status?: "default" | "error";
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  InputStatus;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, status = "default", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          status === "error" ? "border-destructive" : "border-input",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
