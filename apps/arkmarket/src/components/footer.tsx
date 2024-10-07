"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn, focusableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Discord, Telegram, XIcon } from "@ark-market/ui/icons";

import { siteConfig } from "~/config/site";
import ExternalLink from "./external-link";
import { Icons } from "./icons";

const HIDDEN_PATHS = ["/wallet", "/collection", "/token", "/collections"];

export default function Footer() {
  const pathname = usePathname();

  if (HIDDEN_PATHS.some((path) => pathname.startsWith(path))) {
    return null;
  }

  return (
    <footer className="border-t border-border px-8 py-11">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-6 lg:max-w-lg">
          <Link
            href="/"
            className={cn("flex items-center space-x-2", focusableStyles)}
          >
            <Icons.logo className="h-8 w-auto" />
            <span className="sr-only font-bold">{siteConfig.name}</span>
          </Link>
          <p className="font-medium text-muted-foreground">
            Welcome to the largest NFT marketplace based on Starknet Make
            yourself at home among other NFT enthusiasts.
          </p>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
            {siteConfig.links.twitter !== undefined && (
              <Button
                variant="outline"
                className="w-full lg:w-auto"
                size="xl"
                asChild
              >
                <ExternalLink href={siteConfig.links.twitter}>
                  <p className="hidden lg:block">Follow us on</p>
                  <XIcon className="size-4" />
                </ExternalLink>
              </Button>
            )}
            {siteConfig.links.discord !== undefined && (
              <Button
                variant="outline"
                className="w-full lg:w-auto"
                size="xl"
                asChild
              >
                <ExternalLink href={siteConfig.links.discord}>
                  <p className="hidden lg:block">Join us on</p>
                  <Discord className="size-4" />
                </ExternalLink>
              </Button>
            )}
            {siteConfig.links.telegram !== undefined && (
              <Button
                variant="outline"
                className="w-full lg:w-auto"
                size="xl"
                asChild
              >
                <ExternalLink href={siteConfig.links.telegram}>
                  <p className="hidden lg:block">Chat with us on </p>
                  <Telegram className="size-4" />
                </ExternalLink>
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between text-muted-foreground lg:gap-40">
          <div className="flex flex-col gap-6">
            <h4 className="text-xl font-semibold text-foreground">About</h4>
            <p>Terms</p>
            <p>Privacy Policy</p>
            <p>Explore Collections</p>
          </div>
          <div className="flex flex-col gap-6 lg:mr-16">
            <h4 className="text-xl font-semibold text-foreground">Contact</h4>
            <p>Get collection verified</p>
            <p>Support</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
