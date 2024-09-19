"use client";

import { useState } from "react";

import { cn } from "@ark-market/ui";
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
import CollectionHeaderStats from "./collection-header-stats";

interface MobileCollectionHeaderProps {
  collectionAddress: string;
  collection: Collection;
}

export default function MobileCollectionHeader({
  collectionAddress,
  collection,
}: MobileCollectionHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b bg-background lg:hidden">
      <Collapsible className="" open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full px-5 py-4">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              {collection.image ? (
                <img
                  src={collection.image}
                  className="aspect-square h-8 rounded-xs"
                  alt={collection.name}
                />
              ) : (
                <div className="aspect-square h-8 rounded-xs bg-secondary" />
              )}
              <p className="-mt-1 text-lg font-semibold">{collection.name}</p>
              <VerifiedIcon size={18} className="text-primary" />
            </div>
            <div className="flex size-8 items-center justify-center rounded-xs border border-input">
              <ChevronDown
                size={14}
                className={cn("transition-all", isOpen && "rotate-180")}
              />
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
          <div className="flex flex-col gap-3 px-5 pb-4">
            <p className="flex items-center gap-2 text-sm">
              Created
              <span className="text-muted-foreground"> Feb 2000</span>
              Creator earnings
              <span className="text-muted-foreground"> 1000%</span>
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <CopyButton textToCopy={collectionAddress} className="h-6" />
              <ExternalLink href="/">
                <XIcon className="h-6 w-auto" />
              </ExternalLink>
              <ExternalLink href="/">
                <Discord className="h-6 w-auto" />
              </ExternalLink>
              <ExternalLink href="/">
                <Globe className="h-6 w-auto" />
              </ExternalLink>
            </div>
            <CollectionHeaderStats collection={collection} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
