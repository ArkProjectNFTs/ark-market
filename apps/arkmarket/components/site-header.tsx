import React from "react";

import { ThemeToggle } from "@ark-market/ui/components/theme";

import { CommandMenu } from "~/components/command-menu";
import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";

const SiteHeader = () => {
  return (
    <div className="absolute top-0 z-20 flex h-16 w-full items-center justify-between border-b px-5">
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
};

export { SiteHeader };
