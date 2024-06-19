import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import DiscordIcon from "@ark-market/ui/components/icons/discord-icon";
import XIcon from "@ark-market/ui/components/icons/x-icon";
import { Separator } from "@ark-market/ui/components/separator";
import { cn } from "@ark-market/ui/lib/utils";

import ExternalLink from "~/components/external-link";
import Prices from "~/components/prices";
import SystemStatus from "~/components/system-status";
import { siteConfig } from "~/config/site";

export default async function CollectionFooter({
  className,
}: PropsWithClassName) {
  return (
    <footer
      className={cn(
        "flex h-10 items-center justify-between border-t border-border bg-background px-5 text-xs",
        className,
      )}
    >
      <div className="flex h-full items-center gap-4">
        <SystemStatus />
        <Separator orientation="vertical" />
        <ExternalLink href={siteConfig.links.twitter}>
          <XIcon />
        </ExternalLink>
        <ExternalLink href="/">
          <DiscordIcon />
        </ExternalLink>
        <Separator orientation="vertical" />
      </div>
      <Prices />
    </footer>
  );
}
