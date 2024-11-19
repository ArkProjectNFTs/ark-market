"use client";

import { useState } from "react";
import Link from "next/link";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import { useQuery } from "@tanstack/react-query";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles, shortAddress } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Discord,
  Globe,
  XIcon,
} from "@ark-market/ui/icons";

import type { Token } from "~/types";
import CopyButton from "~/components/copy-button";
import ExternalLink from "~/components/external-link";
import Media from "~/components/media";
import getCollection from "~/lib/getCollection";
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
  const { data: collection } = useQuery({
    queryKey: ["collection", address],
    queryFn: () =>
      getCollection({
        collectionAddress: token.collection_address,
      }),
  });

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
        <h3 className="font-display text-2xl font-semibold">About & details</h3>
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
              {collection?.description}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-6 text-muted-foreground lg:mt-10">
          <CopyButton textToCopy={collection?.address} />
          <ExternalLink href={collection?.twitter}>
            <XIcon className="h-6" />
          </ExternalLink>
          <ExternalLink href={collection?.discord}>
            <Discord className="h-6" />
          </ExternalLink>
          <ExternalLink href={collection?.website}>
            <Globe className="h-6" />
          </ExternalLink>
        </div>

        <p className="mt-6 text-sm lg:hidden">{collection?.description}</p>

        <div className="mt-8 flex flex-col gap-4 pb-6">
          <div className="flex items-center justify-between">
            <p className="font-medium">Contract Address</p>
            <p className="text-muted-foreground transition-colors hover:text-primary">
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
              <p className="text-muted-foreground transition-colors hover:text-primary">
                {ownerShortenedAddress}
              </p>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Royalty</p>
            <p className="text-muted-foreground">-</p>
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
