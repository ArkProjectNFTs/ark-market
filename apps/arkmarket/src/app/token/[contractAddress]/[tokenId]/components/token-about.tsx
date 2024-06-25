import { ChevronDown } from "lucide-react";

import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import DiscordIcon from "@ark-market/ui/icons/discord-icon";
import WebsiteIcon from "@ark-market/ui/icons/website-icon";
import XIcon from "@ark-market/ui/icons/x-icon";

export default function TokenAbout() {
  return (
    <Collapsible className="rounded-lg border border-border px-6" defaultOpen>
      <div className="flex h-[4.5rem] items-center justify-between">
        <h2 className="text-3xl font-semibold">About</h2>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-small">
            <ChevronDown size={14} />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        <div className="flex items-center gap-6">
          <div className="size-28 flex-shrink-0 rounded-lg bg-secondary"></div>
          <p className="text-sm">
            {`Everai is a pioneering web3 brand set to expand its universe powered
          by the collective creativity of its artistic partners and vibrant
          community. In the Everai Universe, the Everais stand as the mightiest
          heroes of Shodai's civilization… Get yours now to join us in this
          collaborative journey to shape the Everai Universe!`}
          </p>
        </div>

        <div className="mt-10 flex items-center gap-4 text-muted-foreground">
          <XIcon className="size-4" />
          <DiscordIcon className="size-4" />
          <WebsiteIcon className="size-4" />
        </div>

        <div className="mt-8 flex flex-col gap-4 pb-6">
          <div className="flex items-center justify-between">
            <p className="font-medium">Contract Address</p>
            <p className="text-muted-foreground">0x00...0000</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Token ID</p>
            <p className="text-muted-foreground">7078</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Token Standard</p>
            <p className="text-muted-foreground">ERC721</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Owner</p>
            <p className="text-muted-foreground">0x00...0000</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Royalty</p>
            <p className="text-muted-foreground">_%</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Chain</p>
            <p className="text-muted-foreground">Starknet</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
