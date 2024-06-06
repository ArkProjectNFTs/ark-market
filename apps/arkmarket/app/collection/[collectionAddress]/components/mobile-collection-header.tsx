"use client";

import type { HTMLAttributes } from "react";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ChevronDown, Copy, Globe, Globe2 } from "lucide-react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/components/collapsible";
import CopyIcon from "@ark-market/ui/components/icons/copy-icon";
import DiscordIcon from "@ark-market/ui/components/icons/discord-icon";
import WebsiteIcon from "@ark-market/ui/components/icons/website-icon";
import XIcon from "@ark-market/ui/components/icons/x-icon";
import { cn } from "@ark-market/ui/lib/utils";

import type { CollectionInfosApiResponse } from "../queries/getCollectionData";
import ExternalLink from "~/components/external-link";
import { collectionBannerRemHeight } from "./collection-banner";
import CollectionHeaderStats from "./collection-header-stats";

const MotionButton = motion(Button);

interface MobileCollectionHeaderProps {
  collectionInfos: CollectionInfosApiResponse;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export default function MobileCollectionHeader({
  className,
  collectionInfos,
  style,
}: PropsWithClassName<MobileCollectionHeaderProps>) {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  return (
    <div className={cn("bg-background", className)} style={style}>
      <Collapsible
        className={cn("w-full border-b border-border p-5")}
        open={collapsibleOpen}
        onOpenChange={setCollapsibleOpen}
      >
        <div className="flex h-full items-center justify-between gap-0">
          <div className="flex h-8 w-full flex-shrink-0 items-center justify-between">
            <div className="flex h-full items-center gap-2">
              <div className="aspect-square h-full flex-shrink-0 rounded-lg bg-secondary" />
              <div className="flex flex-shrink-0">
                <p className="text-lg font-semibold">
                  {collectionInfos.collection_name ?? "Unknown collection"}
                </p>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="icon-small">
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

            <div className="mt-4 flex items-center gap-4 text-muted-foreground">
              <ExternalLink href="/">
                {/* TODO @YohanTz: Copy collection address */}
                <Copy className="h-6 w-auto" />
              </ExternalLink>
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

            <CollectionHeaderStats
              collectionInfos={collectionInfos}
              className="mt-6"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
