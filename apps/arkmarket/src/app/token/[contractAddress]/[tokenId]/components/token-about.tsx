"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import DiscordIcon from "@ark-market/ui/icons/discord-icon";
import WebsiteIcon from "@ark-market/ui/icons/website-icon";
import XIcon from "@ark-market/ui/icons/x-icon";

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
          <Button variant="outline" size="icon-sm">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        <div className="flex items-center gap-5">
          <div className="size-16 flex-shrink-0 rounded-lg bg-secondary lg:size-28"></div>
          <div>
            <h4 className="text-xl font-semibold">
              {tokenInfos.collection_name}
            </h4>
            <p className="mt-2 hidden text-sm lg:block">
              {`Everai is a pioneering web3 brand set to expand its universe powered
          by the collective creativity of its artistic partners and vibrant
          community. In the Everai Universe, the Everais stand as the mightiest
          heroes of Shodai's civilization… Get yours now to join us in this
          collaborative journey to shape the Everai Universe!`}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-4 text-muted-foreground lg:mt-10">
          <Button variant="outline" size="icon-xl" className="w-full lg:w-12">
            <XIcon className="size-4" />
          </Button>
          <Button variant="outline" size="icon-xl" className="w-full lg:w-12">
            <DiscordIcon className="size-4" />
          </Button>
          <Button variant="outline" size="icon-xl" className="w-full lg:w-12">
            <WebsiteIcon className="size-4" />
          </Button>
        </div>

        <p className="mt-6 text-sm lg:hidden">
          {`Everai is a pioneering web3 brand set to expand its universe powered
          by the collective creativity of its artistic partners and vibrant
          community. In the Everai Universe, the Everais stand as the mightiest
          heroes of Shodai's civilization… Get yours now to join us in this
          collaborative journey to shape the Everai Universe!`}
        </p>

        <div className="mt-8 flex flex-col gap-4 pb-6">
          <div className="flex items-center justify-between">
            <p className="font-medium">Contract Address</p>
            <p className="text-muted-foreground">
              {collectionShortenedAddress}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p className="whitespace-nowrap font-medium">Token ID</p>
            <p className={cn("text-muted-foreground", ellipsableStyles)}>
              {tokenId}
            </p>
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
