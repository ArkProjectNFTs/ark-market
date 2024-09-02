"use client";

import * as React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { cn } from "@ark-market/ui";

import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";
import GlobalSearch from "./global-search";
import MobileGlobalSearch from "./mobile-global-search";

export default function SiteHeader() {
  const pathname = usePathname();
  const isTokenPage = pathname.includes("token/");
  const [showHeader, setShowHeader] = useState(true);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 60 && showHeader) {
      setShowHeader(false);
    } else if (latest <= 60 && !showHeader) {
      setShowHeader(true);
    }
  });
  return (
    <div
      className={cn(
        "sticky top-0 z-30 flex h-[var(--site-header-height)] w-full items-center justify-between border-b bg-background px-5 transition-transform duration-300 lg:border-b",
        !showHeader && isTokenPage
          ? "lg:-translate-y-full"
          : "lg:translate-y-0",
      )}
    >
      <MainNav />
      <div className="hidden justify-center lg:flex">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center lg:hidden">
          <MobileGlobalSearch />
        </div>

        <UserNav />
      </div>
    </div>
  );
}
