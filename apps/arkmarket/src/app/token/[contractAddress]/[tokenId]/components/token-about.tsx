"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import { ChevronDown, ChevronUp } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles, shortAddress } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import DiscordIcon from "@ark-market/ui/icons/discord-icon";
import WebsiteIcon from "@ark-market/ui/icons/website-icon";
import XIcon from "@ark-market/ui/icons/x-icon";
import { Typography } from "@ark-market/ui/typography";

import type { Token } from "~/types";
import Media from "~/components/media";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface TokenAboutProps {
  contractAddress: string;
  token: Token;
  tokenId: string;
}

export default function TokenAbout({
  className,
  contractAddress,
  token,
  tokenId,
}: PropsWithClassName<TokenAboutProps>) {
  const [open, setOpen] = useState(true);
  const { address } = useAccount();
  const collectionShortenedAddress = shortAddress(contractAddress);
  const { data: starkProfile } = useStarkProfile({ address: token.owner });

  const ownerShortenedAddress =
    starkProfile?.name ??
    ownerOrShortAddress({
      ownerAddress: token.owner,
      address,
    });

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
        <Typography asChild variant="h2">
          <h2>About & details</h2>
        </Typography>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon-sm">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        <div className="flex items-center gap-5">
          <Media
            height={224}
            width={224}
            className="size-16 flex-shrink-0 rounded-lg bg-secondary lg:size-28"
            alt={token.collection_name}
            src={token.collection_image}
          />
          <div>
            <h4 className="text-xl font-semibold">{token.collection_name}</h4>
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
              <Link
                href={`https://starkscan.co/nft-contract/${contractAddress}`}
                target="_blank"
              >
                {collectionShortenedAddress}
              </Link>
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
            <Link href={`/wallet/${token.owner}`}>
              <p className="text-muted-foreground">{ownerShortenedAddress}</p>
            </Link>
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
