"use client";

import { useState } from "react";

import type {
  WalletCollection,
  WalletCollectionsApiResponse,
  WalletTokensApiResponse,
} from "../queries/getWalletData";
import type { ViewType } from "~/components/view-type-toggle-group";
import PortfolioItemsData from "./portfolio-items-data";
import PortfolioItemsFiltersPanel from "./portfolio-items-filters-panel";
import PortfolioItemsToolsBar from "./portfolio-items-tools-bar";

interface PortfolioProps {
  walletAddress: string;
  walletCollectionsInitialData: WalletCollectionsApiResponse;
  walletTokensInitialData: WalletTokensApiResponse;
}

export default function Portfolio({
  walletAddress,
  walletCollectionsInitialData,
  walletTokensInitialData,
}: PortfolioProps) {
  const [itemsFiltersOpen, setItemsFiltersOpen] = useState(false);
  // TODO @YohanTz: Choose between local storage and URL query param
  const [viewType, setViewType] = useState<ViewType>("large-grid");

  return (
    <div className="flex">
      <PortfolioItemsFiltersPanel
        filtersOpen={itemsFiltersOpen}
        className="sticky top-[var(--site-header-height)] hidden h-[calc(100vh-var(--site-header-height))] sm:block"
        walletCollectionsInitialData={walletCollectionsInitialData}
      />

      <div className="w-full">
        <div className="sticky top-[var(--site-header-height)] z-10 bg-background px-5 py-4">
          <PortfolioItemsToolsBar
            walletCollectionsInitialData={walletCollectionsInitialData}
            // className="mt-6"
            toggleFiltersOpen={() =>
              setItemsFiltersOpen((previous) => !previous)
            }
            setViewType={setViewType}
            viewType={viewType}
          />
        </div>
        <PortfolioItemsData
          viewType={viewType}
          walletTokensInitialData={walletTokensInitialData}
          walletAddress={walletAddress}
        />
      </div>
    </div>
  );
}
