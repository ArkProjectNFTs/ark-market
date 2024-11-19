"use client";

import { useState } from "react";
import moment from "moment";

import { cn, focusableStyles } from "@ark-market/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import {
  ChevronDown,
  Discord,
  Globe,
  VerifiedIcon,
  XIcon,
} from "@ark-market/ui/icons";

import type { Collection } from "~/types";
import CopyButton from "~/components/copy-button";
import ExternalLink from "~/components/external-link";
import useCollection from "~/hooks/useCollection";
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

  const { data } = useCollection({ address: collectionAddress });

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
                  <p className="font-display text-2xl font-semibold">
                    {collection.name}
                  </p>
                  {collection.is_verified && (
                    <VerifiedIcon className="mt-1 text-primary" />
                  )}
                </div>
              </div>
              <div className="mb-1 flex h-6 items-center gap-4 text-sm text-muted-foreground">
                <CopyButton textToCopy={collectionAddress} />
                <ExternalLink href={collection.twitter}>
                  <XIcon className="h-4" />
                </ExternalLink>
                <ExternalLink href={collection.discord}>
                  <Discord className="h-4" />
                </ExternalLink>
                <ExternalLink href={collection.website}>
                  <Globe className="h-4" />
                </ExternalLink>
                {collection.description && (
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "ml-1 flex items-center gap-1 hover:text-foreground",
                        focusableStyles,
                      )}
                    >
                      <p className="flex items-center">
                        {collapsibleOpen ? "Less Info" : "More Info"}
                      </p>
                      <p className="flex items-center text-xs">
                        <ChevronDown size={16} />
                      </p>
                    </button>
                  </CollapsibleTrigger>
                )}
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <CollectionHeaderStats collection={collection} />
          </div>
        </div>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <p className="mb-2 max-w-lg pt-4 text-sm">{collection.description}</p>
          <p className="flex items-center gap-2 text-sm">
            Created
            <span className="text-muted-foreground">
              {collection.deployed_timestamp
                ? moment.unix(collection.deployed_timestamp).format("MMM YYYY")
                : "-"}
            </span>
            Creator earnings
            <span className="text-muted-foreground"> 5%</span>
          </p>
          <div className="block lg:hidden">
            <CollectionHeaderStats collection={data} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
