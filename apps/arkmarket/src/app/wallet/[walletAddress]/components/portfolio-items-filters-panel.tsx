"use client";

import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import type { WalletCollectionsApiResponse } from "../queries/getWalletData";
import PortfolioItemsFiltersContent from "./portfolio-items-filters-content";

interface PortfolioItemsFitlersPanelProps {
  filtersOpen: boolean;
  walletAddress: string;
  walletCollectionsInitialData: WalletCollectionsApiResponse;
}

export default function PortfolioItemsFitlersPanel({
  className,
  filtersOpen,
  walletAddress,
  walletCollectionsInitialData,
}: PropsWithClassName<PortfolioItemsFitlersPanelProps>) {
  return (
    <AnimatePresence>
      {filtersOpen && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "16rem" }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          exit={{ opacity: 0, width: 0 }}
          className={cn(
            "flex-shrink-0 overflow-y-auto overflow-x-visible",
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            filtersOpen && "border-r border-border",
            className,
          )}
        >
          <PortfolioItemsFiltersContent
            walletAddress={walletAddress}
            className="h-full w-64 overflow-x-visible px-5 py-6"
            walletCollectionsInitialData={walletCollectionsInitialData}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}