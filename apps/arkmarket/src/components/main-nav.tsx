"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn, focusableStyles } from "@ark-market/ui";

import { Icons } from "~/components/icons";
import { siteConfig } from "~/config/site";

const mainNavLinks = [
  // { name: "Explore collections", href: "/collections" }
] as { name: string; href: string }[];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-4", className)}
      {...props}
    >
      <Link
        href="/"
        className={cn("flex items-center space-x-2", focusableStyles)}
      >
        <Icons.logo className="h-5 w-auto md:h-8" />
        <span className="sr-only font-bold">{siteConfig.name}</span>
      </Link>
      <div className="hidden items-center gap-2 lg:flex">
        {mainNavLinks.map((mainNavLink) => {
          const isActiveLink = mainNavLink.href === pathname;

          return (
            <Link
              href={mainNavLink.href}
              key={mainNavLink.name}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActiveLink ? "text-primary" : "text-muted-foreground",
                focusableStyles,
              )}
            >
              {mainNavLink.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
