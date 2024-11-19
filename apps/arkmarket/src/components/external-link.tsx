import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

import { cn, focusableStyles } from "@ark-market/ui";

type ExternalLinkProps = {
  className?: string;
} & PropsWithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>;

export default function ExternalLink({
  children,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      className={cn(
        "leading-none transition-colors hover:text-foreground",
        props.href ?? "pointer-events-none",
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
