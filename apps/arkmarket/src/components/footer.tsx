import Link from "next/link";
import { SiTelegram } from "react-icons/si";

import { cn, focusableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import DiscordIcon from "@ark-market/ui/icons/discord-icon";
import XIcon from "@ark-market/ui/icons/x-icon";

import { siteConfig } from "~/config/site";
import { Icons } from "./icons";

export default function Footer() {
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
            <Button variant="outline" className="w-full lg:w-auto" size="xl">
              <p className="hidden lg:block">Follow us on </p>
              <XIcon className="size-4" />
            </Button>
            <Button variant="outline" className="w-full lg:w-auto" size="xl">
              <p className="hidden lg:block">Join us on</p>
              <DiscordIcon className="size-4" />
            </Button>
            <Button variant="outline" className="w-full lg:w-auto" size="xl">
              <p className="hidden lg:block">Chat with us on </p>
              <SiTelegram size={16} />
            </Button>
          </div>
        </div>
        <div className="flex justify-between text-muted-foreground lg:gap-40">
          <div className="flex flex-col gap-6">
            <h4 className="text-xl font-semibold text-foreground">About</h4>
            <p>Terms</p>
            <p>Privacy Policy</p>
            <p>Explore Collections</p>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-xl font-semibold text-foreground">Contact</h4>
            <p>Telegram</p>
            <p>Support</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
