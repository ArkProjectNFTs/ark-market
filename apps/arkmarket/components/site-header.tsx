import React from "react";

import { ThemeToggle } from "@ark-market/ui/components/theme";

import { CommandMenu } from "~/components/command-menu";
import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";

export const siteHeaderRemHeight = 5.5;

export default function SiteHeader() {
  return (
    <div
      className="sticky top-0 z-20 flex h-[5.5rem] w-full items-center justify-between border-b bg-background px-5"
      style={{ height: `${siteHeaderRemHeight}rem` }}
    >
      <MainNav />
      <div className="w-full flex-1 md:w-auto md:flex-none">
        <CommandMenu />
      </div>
      <div className="flex items-center space-x-4">
        <UserNav />
        <ThemeToggle />
      </div>
    </div>
  );
}
