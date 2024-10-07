"use client";

import { Button } from "@ark-market/ui/button";
import { Discord, Telegram, XIcon } from "@ark-market/ui/icons";

import { siteConfig } from "~/config/site";
import useFooterVisibility from "~/hooks/useFooterVisibility";
import ExternalLink from "./external-link";
import { Icons } from "./icons";

export default function UnframedFooter() {
  const isVisible = useFooterVisibility();

  if (!isVisible) {
    return null;
  }

  return (
    <footer className="mx-8 mb-12 overflow-hidden rounded-[2.625rem] border-border bg-card px-8 py-11">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-6 md:gap-14">
          <p className="text-4xl font-bold leading-[2.475rem] lg:text-7xl lg:leading-[4.5rem]">
            Sell, Buy, Trade
            <br />
            on Starknet
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
                  <p>Follow us on</p>
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
      <div className="flex justify-center">
        <Icons.logo className="-mb-[10rem] mt-16 w-auto text-secondary lg:!text-[12rem]" />
      </div>
    </footer>
  );
}
