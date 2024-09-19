import type { ReactNode } from "react";
import Link from "next/link";

import { cn } from "@ark-market/ui";

interface CollectionNavLinkProps {
  href: string;
  isActive: boolean;
  children: ReactNode;
}

export default function CollectionNavLink({
  href,
  isActive,
  children,
}: CollectionNavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "border-b-2 border-b-transparent pb-1 text-base font-bold text-muted-foreground transition-all hover:text-foreground",
        isActive && "border-b-primary text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
