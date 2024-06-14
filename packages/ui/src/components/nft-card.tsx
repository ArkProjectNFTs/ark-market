import React from "react";

import { cn } from "../lib/utils";
import { Button } from "./button";

const NftCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xs group relative w-full overflow-hidden bg-card text-card-foreground",
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

const NftCardAction = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <div className="absolute bottom-0 left-0 h-10 w-full bg-card opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100">
    <Button
      ref={ref}
      className={cn("w-full rounded-none", className)}
      {...props}
    />
  </div>
));
NftCardAction.displayName = "NftCardAction";

export { NftCard, NftCardMedia, NftCardContent, NftCardAction };
