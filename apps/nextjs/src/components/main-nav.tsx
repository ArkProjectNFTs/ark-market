"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@ark-market/ui/lib/utils";

const mainNavLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Portfolio", href: "/portfolio" },
  // { name: "Activity", href: "/activity" },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {mainNavLinks.map((mainNavLink) => {
        const isActiveLink = mainNavLink.href === pathname;

        return (
          <Link
            href={mainNavLink.href}
            key={mainNavLink.name}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActiveLink ? "text-primary" : "text-muted-foreground",
            )}
          >
            {mainNavLink.name}
          </Link>
        );
      })}
    </nav>
  );
}
