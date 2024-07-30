import * as React from "react";

import type { ButtonProps } from "./button";
import { cn } from ".";
import { Button } from "./button";

const NftCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative w-full overflow-hidden rounded-xs bg-card text-card-foreground",
      className,
    )}
    {...props}
  />
));
NftCard.displayName = "NftCard";

const NftCardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("aspect-square w-full overflow-hidden", className)}
    {...props}
  />
));
NftCardMedia.displayName = "NftCardMedia";

const NftCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-3", className)} {...props} />
));
NftCardContent.displayName = "NftCardContent";

const NftCardAction = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    // TODO @YohanTz: Handle focus-visible properly
    <div className="absolute bottom-0 left-0 w-full bg-card opacity-0 transition-opacity group-hover:opacity-100">
      <Button
        size="xl"
        ref={ref}
        className={cn(
          "h-10 w-full rounded-none opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100",
          className,
        )}
        {...props}
      />
    </div>
  ),
);
NftCardAction.displayName = "NftCardAction";

export { NftCard, NftCardMedia, NftCardContent, NftCardAction };
