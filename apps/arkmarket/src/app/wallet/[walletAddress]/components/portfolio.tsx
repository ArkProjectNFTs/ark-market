"use client";

import { useState } from "react";

import { formatNumber } from "@ark-market/ui";
import { TabsListV2, TabsTriggerV2, TabsV2 } from "@ark-market/ui/tabs-v2";

import type {
  WalletCollectionsApiResponse,
  WalletTokensApiResponse,
} from "../queries/getWalletData";
import type { ViewType } from "~/components/view-type-toggle-group";
import PortfolioHeader from "./portfolio-header";
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
    <main className="flex">
      <PortfolioItemsFiltersPanel
        walletAddress={walletAddress}
        filtersOpen={itemsFiltersOpen}
        className="sticky top-[var(--site-header-height)] hidden h-[calc(100vh-var(--site-header-height))] sm:block"
        walletCollectionsInitialData={walletCollectionsInitialData}
      />
      <div className="flex-1">
        <PortfolioHeader walletAddress={walletAddress} />

        <div className="w-full">
          <div className="sticky top-[var(--site-header-height)] z-10 mb-6 border-b border-border bg-background px-5 pb-4 sm:pt-4 lg:mb-0 lg:border-none">
            <TabsV2 defaultValue="items">
              <TabsListV2 className="mb-4 flex gap-8 border-b border-border sm:mb-6 sm:border-none">
                <TabsTriggerV2
                  value="items"
                  className="flex items-center gap-2"
                >
                  My Items{" "}
                  <p className="flex h-5 items-center rounded-full bg-secondary px-1.5 text-xs font-medium text-secondary-foreground">
                    {formatNumber(walletTokensInitialData.token_count)}
                  </p>
                </TabsTriggerV2>
                <TabsTriggerV2 value="orders">Orders</TabsTriggerV2>
                <TabsTriggerV2 value="activity">Activity</TabsTriggerV2>
              </TabsListV2>
            </TabsV2>
            <PortfolioItemsToolsBar
              walletAddress={walletAddress}
              walletCollectionsInitialData={walletCollectionsInitialData}
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
    </main>
  );
}
