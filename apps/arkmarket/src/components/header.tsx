import React from "react";

import { ThemeToggle } from "@ark-market/ui/components/theme";

import { MainNav } from "~/components/main-nav";
import { UserNav } from "~/components/user-nav";

const Header = () => {
  return (
    <div className="absolute top-0 z-20 flex h-16 w-full items-center border-b px-5">
      <MainNav />
      <div className="ml-auto flex items-center space-x-4">
        <UserNav />
        <ThemeToggle />
      </div>
    </div>
  );
};

export { Header };
