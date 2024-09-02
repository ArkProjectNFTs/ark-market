"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

import { cn, focusableStyles } from "@ark-market/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import DiscordIcon from "@ark-market/ui/icons/discord-icon";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";
import WebsiteIcon from "@ark-market/ui/icons/website-icon";
import XIcon from "@ark-market/ui/icons/x-icon";

import type { Collection } from "~/types";
import CopyButton from "~/components/copy-button";
import ExternalLink from "~/components/external-link";
import getCollection from "~/lib/getCollection";
import CollectionHeaderStats from "./collection-header-stats";

interface CollectionHeaderProps {
  collectionAddress: string;
  collection: Collection;
}

export default function CollectionHeader({
  collectionAddress,
  collection,
}: CollectionHeaderProps) {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["collection", collectionAddress],
    queryFn: () => getCollection({ collectionAddress }),
    initialData: collection,
    refetchInterval: 15_000,
  });

  if (!data) {
    return null;
  }

  return (
    <div className="hidden lg:block">
      <Collapsible
        className="min-h-[6.875rem] w-full border-b border-border p-5 transition-[height]"
        open={collapsibleOpen}
        onOpenChange={setCollapsibleOpen}
      >
        <div className="flex h-full items-center justify-between gap-0">
          <div className="flex h-[3.875rem] flex-shrink-0 items-center gap-4 transition-[height]">
            {data.image ? (
              <img
                src={data.image}
                className="aspect-square h-full flex-shrink-0 rounded-lg"
                alt={data.name}
              />
            ) : (
              <div className="aspect-square h-full flex-shrink-0 rounded-lg bg-secondary" />
            )}
            <div className="flex h-full flex-shrink-0 flex-col items-start justify-between">
              <div>
                <div className="flex items-center gap-1 text-xl">
                  <p className="text-2xl font-semibold">{collection.name}</p>
                  {collection.is_verified && (
                    <VerifiedIcon className="mt-1 text-primary" />
                  )}
                </div>
              </div>
              <div className="mb-1 flex h-6 items-center gap-4 text-muted-foreground">
                <CopyButton textToCopy={collectionAddress} />
                <ExternalLink href="/">
                  <XIcon />
                </ExternalLink>
                <ExternalLink href="/">
                  <DiscordIcon />
                </ExternalLink>
                <ExternalLink href="/">
                  <WebsiteIcon />
                </ExternalLink>
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "ml-1 flex items-center gap-1 hover:text-accent-foreground",
                      focusableStyles,
                    )}
                  >
                    {collapsibleOpen ? "Less Info" : "More Info"}
                    <ChevronDown size={16} />
                  </button>
                </CollapsibleTrigger>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <CollectionHeaderStats collection={collection} />
          </div>
        </div>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <p className="flex items-center gap-2 pt-8">
            Created
            <span className="text-muted-foreground"> Feb 2000</span>
            <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
              <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
            </svg>
            Creator earnings
            <span className="text-muted-foreground"> 1000%</span>
          </p>
          <p className="mb-6 max-w-lg pt-4 text-sm">
            Everai is a pioneering web3 brand set to expand its universe powered
            by the collective creativity of its artistic partners and vibrant
            community. In the Everai Universe, the Everais stand as the
            mightiest heroes of Shodai&apos;s civilization… Get yours now to
            join us in this collaborative journey to shape the Everai Universe!
          </p>
          <div className="block lg:hidden">
            <CollectionHeaderStats collection={data} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
