/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";

import type { HTMLAttributes } from "react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { validateAndParseAddress } from "starknet";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import DiscordIcon from "@ark-market/ui/icons/discord-icon";
import WebsiteIcon from "@ark-market/ui/icons/website-icon";
import XIcon from "@ark-market/ui/icons/x-icon";

import type { Collection } from "~/types";
import CopyButton from "~/components/copy-button";
import ExternalLink from "~/components/external-link";
import CollectionHeaderStats from "./collection-header-stats";

interface MobileCollectionHeaderProps {
  collectionAddress: string;
  collection: Collection;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export default function MobileCollectionHeader({
  collectionAddress,
  collection,
}: PropsWithClassName<MobileCollectionHeaderProps>) {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <div className="border-b bg-background lg:hidden">
      <Collapsible
        className={cn("w-full px-5 pb-4 pt-3.5")}
        open={collapsibleOpen}
        onOpenChange={setCollapsibleOpen}
      >
        <div className="flex h-full items-center justify-between gap-0">
          <div className="flex h-8 w-full flex-shrink-0 items-center justify-between">
            <div className="flex h-full items-center gap-2">
              {/* TODO @YohanTz: Remove */}
              {validateAndParseAddress(collectionAddress) ===
              validateAndParseAddress(
                "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
              ) ? (
                <img
                  src="/collections/everai.png"
                  className="aspect-square h-full flex-shrink-0 rounded-xs"
                  alt="Everai profile"
                />
              ) : collection.image !== null ? (
                <img
                  src={collection.image}
                  className="aspect-square h-full flex-shrink-0 rounded-xs"
                  alt={collection.name}
                />
              ) : (
                <div className="aspect-square h-full flex-shrink-0 rounded-xs bg-secondary" />
              )}
              <div className="flex flex-shrink-0">
                <p className="text-lg font-semibold">
                  {collection.name ?? "Unknown collection"}
                </p>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="icon-sm">
                <ChevronDown size={14} />
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
          <div className="pt-4 text-sm">
            <p className="flex items-center gap-2">
              Created
              <span className="text-muted-foreground"> Feb 2000</span>
              Creator earnings
              <span className="text-muted-foreground"> 1000%</span>
            </p>

            <div className="mb-4 mt-4 flex items-center gap-4 text-muted-foreground">
              <CopyButton textToCopy={collectionAddress} className="h-6" />
              <ExternalLink href="/">
                <XIcon className="h-6 w-auto" />
              </ExternalLink>
              <ExternalLink href="/">
                <DiscordIcon className="h-6 w-auto" />
              </ExternalLink>
              <ExternalLink href="/">
                <WebsiteIcon className="h-6 w-auto" />
              </ExternalLink>
            </div>

            <CollectionHeaderStats collection={collection} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
