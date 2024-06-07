import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

import { cn, focusableStyles } from "@ark-market/ui/lib/utils";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export default function ExternalLink({
  children,
  className,
  ...props
}: PropsWithChildren<AnchorProps>) {
  return (
    <a
      className={cn(
        "transition-colors hover:text-accent-foreground",
        focusableStyles,
        className,
      )}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  );
}
