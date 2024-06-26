"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/components/collapsible";
import DiscordIcon from "@ark-market/ui/components/icons/discord-icon";
import WebsiteIcon from "@ark-market/ui/components/icons/website-icon";
import XIcon from "@ark-market/ui/components/icons/x-icon";
import { cn } from "@ark-market/ui/lib/utils";

import type { TokenInfosApiResponse } from "../queries/getTokenData";

interface TokenAboutProps {
  contractAddress: string;
  tokenId: string;
  tokenInfos: TokenInfosApiResponse["data"];
}

export default function TokenAbout({
  className,
  contractAddress,
  tokenId,
  tokenInfos,
}: PropsWithClassName<TokenAboutProps>) {
  const [open, setOpen] = useState(true);
  const collectionShortenedAddress = useMemo(() => {
    return `${contractAddress.slice(0, 4)}...${contractAddress.slice(-4)}`;
  }, [contractAddress]);

  const ownerShortenedAddress = useMemo(() => {
    if (tokenInfos.owner === null) {
      return undefined;
    }
    return `${tokenInfos.owner.slice(0, 4)}...${tokenInfos.owner.slice(-4)}`;
  }, [tokenInfos.owner]);

  return (
    <Collapsible
      className={cn(
        "rounded-none border-b border-t border-border px-6 lg:rounded-lg lg:border",
        className,
      )}
      open={open}
      onOpenChange={setOpen}
    >
      <div className="flex h-[4.5rem] items-center justify-between">
        <h3 className="text-2xl font-semibold">About & details</h3>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-small">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
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
            <p className="text-muted-foreground">
              {collectionShortenedAddress ?? "_"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Token ID</p>
            <p className="text-muted-foreground">{tokenId}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Token Standard</p>
            <p className="text-muted-foreground">ERC721</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Owner</p>
            <p className="text-muted-foreground">{ownerShortenedAddress}</p>
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
