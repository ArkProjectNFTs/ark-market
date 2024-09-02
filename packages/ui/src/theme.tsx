"use client";

import * as React from "react";
import { Moon, Sun } from "@ark-market/ui/icons";
import { ThemeProvider, useTheme } from "next-themes";

import type { PropsWithClassName } from ".";
import { cn } from ".";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-xl">
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeTabs({ className }: PropsWithClassName) {
  const { setTheme, theme } = useTheme();

  return (
    <Tabs className="w-full" onValueChange={setTheme} value={theme}>
      <TabsList className={cn("grid w-full grid-cols-3", className)}>
        <TabsTrigger value="dark" className="flex items-center gap-2">
          <Moon size={20} />
          Dark
        </TabsTrigger>
        <TabsTrigger value="light" className="flex items-center gap-2">
          <Sun size={20} />
          Light
        </TabsTrigger>
        <TabsTrigger value="system">System</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export { ThemeProvider, ThemeToggle, ThemeTabs };
