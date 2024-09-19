"use client";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import PortfolioItemsFiltersContent from "./portfolio-items-filters-content";

interface PortfolioItemsFitlersPanelProps {
  filtersOpen: boolean;
  walletAddress: string;
  // walletCollectionsInitialData: WalletCollectionsApiResponse;
}

export default function PortfolioItemsFitlersPanel({
  className,
  filtersOpen,
  walletAddress,
  // walletCollectionsInitialData,
}: PropsWithClassName<PortfolioItemsFitlersPanelProps>) {
  return (
    filtersOpen && (
      <div
        className={cn(
          "w-72 flex-shrink-0 overflow-y-auto border-r border-border",
          className,
        )}
      >
        <PortfolioItemsFiltersContent
          walletAddress={walletAddress}
          className="h-full px-5 py-6"
          // walletCollectionsInitialData={walletCollectionsInitialData}
        />
      </div>
    )
  );
}
