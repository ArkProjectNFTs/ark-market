import React from "react";

import { Input } from "@ark-market/ui/components/input";
import { ThemeToggle } from "@ark-market/ui/components/theme";

// import { CommandMenu } from "~/components/command-menu";
import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";

export default function SiteHeader() {
  return (
    <div className="sticky top-0 z-20 flex h-[var(--site-header-height)] w-full items-center justify-between bg-background px-5 lg:border-b">
      <MainNav />
      <div className="w-full flex-1 md:w-auto md:flex-none">
        {/* <CommandMenu /> */}
        <Input
          placeholder="Search Nft, collections and account"
          className="hidden w-80 lg:block"
        />
      </div>
      <div className="flex items-center space-x-4">
        <UserNav />
        <ThemeToggle />
      </div>
    </div>
  );
}
