/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import type { HTMLAttributes } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui";
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
import CollectionHeaderStats from "./collection-header-stats";

interface CollectionHeaderProps {
  collectionAddress: string;
  collection: Collection;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export default function CollectionHeader({
  className,
  collectionAddress,
  collection,
  style,
}: PropsWithClassName<CollectionHeaderProps>) {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <div className={className} style={style}>
      <Collapsible
        className={cn(
          "min-h-[6.875rem] w-full border-b border-border p-5 transition-[height]",
        )}
        open={collapsibleOpen}
        onOpenChange={setCollapsibleOpen}
      >
        <div className="flex h-full items-center justify-between gap-0">
          <div className="flex h-[3.875rem] flex-shrink-0 items-center gap-4 transition-[height]">
            {collection.image !== null ? (
              <img
                src={collection.image}
                className="aspect-square h-full flex-shrink-0 rounded-lg"
                alt={collection.name}
              />
            ) : (
              <div className="aspect-square h-full flex-shrink-0 rounded-lg bg-secondary" />
            )}

            <div className="flex h-full flex-shrink-0 flex-col items-start justify-between">
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-semibold">
                    {collection.name ?? "Unknown collection"}
                  </p>
                  <VerifiedIcon className="text-background" />
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
                      "ml-1 flex items-center gap-1",
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
          <CollectionHeaderStats
            collection={collection}
            className="hidden md:hidden xl:flex"
          />
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
          <p className="max-w-lg pt-4 text-sm">
            Everai is a pioneering web3 brand set to expand its universe powered
            by the collective creativity of its artistic partners and vibrant
            community. In the Everai Universe, the Everais stand as the
            mightiest heroes of Shodai&apos;s civilization… Get yours now to
            join us in this collaborative journey to shape the Everai Universe!
          </p>
          <CollectionHeaderStats
            collection={collection}
            className="mt-8 xl:hidden"
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
