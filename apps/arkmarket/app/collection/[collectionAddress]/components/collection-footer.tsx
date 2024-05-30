import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import DiscordIcon from "@ark-market/ui/components/icons/discord-icon";
import XIcon from "@ark-market/ui/components/icons/x-icon";
import { cn } from "@ark-market/ui/lib/utils";

import ExternalLink from "~/components/external-link";
import { siteConfig } from "~/config/site";

export const collectionFooterRemHeight = 2.5;

export default function CollectionFooter({ className }: PropsWithClassName) {
  return (
    <footer
      className={cn(
        "flex items-center justify-between border-t border-border bg-background px-5 text-xs",
        className,
      )}
      style={{ height: `${collectionFooterRemHeight}rem` }}
    >
      <div className="flex items-center gap-4">
        <ExternalLink href={siteConfig.links.twitter}>
          <XIcon />
        </ExternalLink>
        <ExternalLink href="/">
          <DiscordIcon />
        </ExternalLink>
      </div>
      <div className="flex items-center gap-7">
        <div>ETH Price: Unknown</div>
        <div>STRK Price: Unknown</div>
      </div>
    </footer>
  );
}
