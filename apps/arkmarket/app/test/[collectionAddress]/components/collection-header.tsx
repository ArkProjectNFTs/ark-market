"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@ark-market/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/components/collapsible";
import CopyIcon from "@ark-market/ui/components/icons/copy-icon";
import DiscordIcon from "@ark-market/ui/components/icons/discord-icon";
import EtherscanIcon from "@ark-market/ui/components/icons/etherscan-icon";
import WebsiteIcon from "@ark-market/ui/components/icons/website-icon";
import XIcon from "@ark-market/ui/components/icons/x-icon";
import { cn } from "@ark-market/ui/lib/utils";

import ExternalLink from "~/components/external-link";
import { collectionBannerRemHeight } from "./collection-banner";
import CollectionHeaderStats from "./collection-header-stats";

const MotionButton = motion(Button);

export const smallCollectionHeaderRemHeight = 3.875;
export const bigCollectionHeaderRemHeight = 6.375;
export const yCollectionHeaderRemPadding = 1.25;

export const collectionHeaderRemHeight =
  smallCollectionHeaderRemHeight + 2 * yCollectionHeaderRemPadding;

export default function CollectionHeader() {
  const [hasPassedBanner, setHasPassedBanner] = useState(false);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const shouldShowCollapsibleContent = !hasPassedBanner && collapsibleOpen;

  useEffect(() => {
    const handleScroll = () => {
      // TODO @YohanTz: Get root element's font size (might not always be 16)
      if (window.scrollY >= collectionBannerRemHeight * 16) {
        setHasPassedBanner(true);
      } else {
        setHasPassedBanner(false);
      }
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Collapsible
      className="w-full border-b border-border px-5"
      style={{
        paddingTop: `${yCollectionHeaderRemPadding}rem`,
        paddingBottom: `${yCollectionHeaderRemPadding}rem`,
      }}
      open={shouldShowCollapsibleContent}
      onOpenChange={setCollapsibleOpen}
    >
      <div
        className={cn("flex items-center justify-between transition-[height]")}
        style={{
          height: hasPassedBanner
            ? `${smallCollectionHeaderRemHeight}rem`
            : `${bigCollectionHeaderRemHeight}rem`,
        }}
      >
        <div className="flex h-full flex-shrink-0 items-center gap-4">
          <div className="aspect-square h-full flex-shrink-0 rounded-xl bg-secondary" />
          <div className="flex h-full flex-shrink-0 flex-col items-start justify-between">
            <div>
              <p className="text-lg font-semibold">Collection name</p>
              <AnimatePresence>
                {!hasPassedBanner && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    transition={{ ease: "easeInOut", duration: 0.15 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="flex items-center gap-2 pt-2">
                      Created
                      <span className="text-muted-foreground"> Mar 2022</span>
                      <svg width="4" height="4" viewBox="0 0 4 4" fill="none">
                        <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
                      </svg>
                      Creator earnings
                      <span className="text-muted-foreground"> 5%</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
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
              <ExternalLink href="/">
                <EtherscanIcon />
              </ExternalLink>
              <AnimatePresence>
                {!hasPassedBanner && (
                  <CollapsibleTrigger asChild>
                    <MotionButton
                      variant="link"
                      size="sm"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      transition={{ ease: "easeInOut", duration: 0.15 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      More Info
                    </MotionButton>
                  </CollapsibleTrigger>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <CollectionHeaderStats />
      </div>
      <CollapsibleContent className="data-[state=closed]:animate-[collapsible-up_150ms_ease] data-[state=open]:animate-[collapsible-down_150ms_ease]">
        <p className="max-w-lg pt-5 text-sm">
          Everai is a pioneering web3 brand set to expand its universe powered
          by the collective creativity of its artistic partners and vibrant
          community. In the Everai Universe, the Everais stand as the mightiest
          heroes of Shodai&apos;s civilization… Get yours now to join us in this
          collaborative journey to shape the Everai Universe!
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
