/* eslint-disable @next/next/no-img-element */
"use client";

import type { HTMLAttributes } from "react";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { validateAndParseAddress } from "starknet";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Button } from "@ark-market/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/components/collapsible";
import CopyIcon from "@ark-market/ui/components/icons/copy-icon";
import DiscordIcon from "@ark-market/ui/components/icons/discord-icon";
import VerifiedIcon from "@ark-market/ui/components/icons/verified-icon";
import WebsiteIcon from "@ark-market/ui/components/icons/website-icon";
import XIcon from "@ark-market/ui/components/icons/x-icon";
import { cn, focusableStyles } from "@ark-market/ui/lib/utils";

import type { CollectionInfosApiResponse } from "../queries/getCollectionData";
import ExternalLink from "~/components/external-link";
import { collectionBannerRemHeight } from "./collection-banner";
import CollectionHeaderStats from "./collection-header-stats";

const MotionButton = motion(Button);

interface CollectionHeaderProps {
  collectionAddress: string;
  collectionInfos: CollectionInfosApiResponse;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export default function CollectionHeader({
  className,
  collectionAddress,
  collectionInfos,
  style,
}: PropsWithClassName<CollectionHeaderProps>) {
  const [hasPassedBanner, setHasPassedBanner] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    // TODO @YohanTz: Get root element's font size (might not always be 16)
    const collectionBannerPxHeight = collectionBannerRemHeight * 16;

    if (!hasPassedBanner && latest >= collectionBannerPxHeight) {
      setHasPassedBanner(true);
    } else if (hasPassedBanner && latest < collectionBannerPxHeight) {
      setHasPassedBanner(false);
    }
  });

  const shouldShowCollapsibleContent = !hasPassedBanner && collapsibleOpen;

  return (
    <div className={cn("bg-background", className)} style={style}>
      <Collapsible
        className={cn(
          "min-h-[var(--collection-header-height)] w-full border-b border-border p-5 transition-[height]",
        )}
        open={shouldShowCollapsibleContent}
        onOpenChange={setCollapsibleOpen}
      >
        <div className="flex h-full items-center justify-between gap-0">
          <div className="flex h-[3.875rem] flex-shrink-0 items-center gap-4 transition-[height]">
            {validateAndParseAddress(collectionAddress) ===
            validateAndParseAddress(
              "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
            ) ? (
              <img
                src="/medias/everai_profile_picture.png"
                className="aspect-square h-full flex-shrink-0 rounded-lg"
                alt="Everai profile"
              />
            ) : (
              <div className="aspect-square h-full flex-shrink-0 rounded-lg bg-secondary" />
            )}

            <div className="flex h-full flex-shrink-0 flex-col items-start justify-between">
              <div>
                <div className="flex items-center gap-1">
                  <p className="text-2xl font-semibold">
                    {collectionInfos.collection_name ?? "Unknown collection"}
                  </p>
                  <VerifiedIcon className="text-background" />
                </div>
              </div>
              <div className="mb-1 flex h-6 items-center gap-4 text-muted-foreground">
                <ExternalLink href="/">
                  {/* TODO @YohanTz: Copy collection address */}
                  <CopyIcon />
                </ExternalLink>
                <ExternalLink href="/">
                  <XIcon />
                </ExternalLink>
                <ExternalLink href="/">
                  <DiscordIcon />
                </ExternalLink>
                <ExternalLink href="/">
                  <WebsiteIcon />
                </ExternalLink>
                <AnimatePresence>
                  {!hasPassedBanner && (
                    <CollapsibleTrigger asChild>
                      <motion.button
                        className={cn(
                          "ml-1 flex items-center gap-1",
                          focusableStyles,
                        )}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ ease: "easeInOut", duration: 0.15 }}
                        exit={{ height: 0, opacity: 0 }}
                      >
                        More Info
                        <ChevronDown size={16} />
                      </motion.button>
                    </CollapsibleTrigger>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <CollectionHeaderStats
            collectionInfos={collectionInfos}
            className="hidden md:hidden xl:flex"
          />
        </div>
        <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
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
            collectionInfos={collectionInfos}
            className="mt-8 xl:hidden"
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
