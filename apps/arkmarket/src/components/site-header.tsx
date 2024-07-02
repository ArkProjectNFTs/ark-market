"use client";

import * as React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useMotionValueEvent, useScroll } from "framer-motion";

import { cn } from "@ark-market/ui";
import { SearchInput } from "@ark-market/ui/search-input";

import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";

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
        "sticky top-0 z-20 flex h-[var(--site-header-height)] w-full items-center justify-between bg-background px-5 transition-transform duration-300 lg:border-b",
        !showHeader && isTokenPage
          ? "lg:-translate-y-full"
          : "lg:translate-y-0",
      )}
    >
      <MainNav />
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <SearchInput
          placeholder="Search Nft, collections and account"
          className="hidden w-80 lg:block"
        />
      </div>
      <div className="flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  );
}
