"use client";

import { useMemo, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { validateAndParseAddress } from "starknet";

import type { ViewType } from "~/components/view-type-toggle-group";
import type { WalletTokensApiResponse } from "~/queries/getWalletData";
import {
  walletCollectionFilterKey,
  walletCollectionFilterParser,
} from "~/lib/wallet-search-params";
import { getWalletTokens } from "~/queries/getWalletData";
import PortfolioActivityData from "./portfolio-activity-data";
import PortfolioHeader from "./portfolio-header";
import PortfolioItemsData from "./portfolio-items-data";
import PortfolioItemsFiltersPanel from "./portfolio-items-filters-panel";
import PortfolioItemsToolsBar from "./portfolio-items-tools-bar";
import PortfolioTabs, { portfolioTabsValues } from "./portfolio-tabs";

interface PortfolioProps {
  walletAddress: string;
  // walletCollectionsInitialData: WalletCollectionsApiResponse;
  // walletTokensInitialData: WalletTokensApiResponse;
}

export default function Portfolio({
  walletAddress,
  // walletCollectionsInitialData,
  // walletTokensInitialData,
}: PortfolioProps) {
  const [itemsFiltersOpen, setItemsFiltersOpen] = useState(false);
  // TODO @YohanTz: Choose between local storage and URL query param
  const [viewType, setViewType] = useState<ViewType>("large-grid");
  const [selectedTab, setSelectedTab] = useQueryState(
    "activeTab",
    parseAsStringLiteral(portfolioTabsValues).withDefault("items"),
  );
  const { address } = useAccount();

  const [collectionFilter, _] = useQueryState(
    walletCollectionFilterKey,
    walletCollectionFilterParser,
  );

  const isOwner =
    address !== undefined &&
    validateAndParseAddress(address) === validateAndParseAddress(walletAddress);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletTokens", collectionFilter, walletAddress],
    refetchInterval: 10_000,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage: WalletTokensApiResponse) => lastPage.next_page,
    // initialData: isSSR
    //   ? {
    //       pages: [walletTokensInitialData],
    //       pageParams: [],
    //     }
    //   : undefined,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getWalletTokens({
        page: pageParam,
        walletAddress,
        collectionAddress: collectionFilter,
      }),
  });
  const portoflioItemsCount = infiniteData?.pages[0]?.token_count ?? 0;

  const walletTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  return (
    <main className="flex">
      {selectedTab === "items" && (
        <PortfolioItemsFiltersPanel
          walletAddress={walletAddress}
          filtersOpen={itemsFiltersOpen}
          className="sticky top-[var(--site-header-height)] hidden h-[calc(100vh-var(--site-header-height))] sm:block"
          // walletCollectionsInitialData={walletCollectionsInitialData}
        />
      )}
      <div className="flex-1">
        <PortfolioHeader walletAddress={walletAddress} />
        <div className="w-full">
          <div className="sticky top-[var(--site-header-height)] z-10 mb-6 border-b border-border bg-background px-5 pb-4 sm:pt-4 lg:mb-0 lg:border-none">
            <PortfolioTabs
              isOwner={isOwner}
              value={selectedTab}
              onValueChange={setSelectedTab}
              portfolioItemsCount={portoflioItemsCount}
            />
            {selectedTab === "items" && (
              <PortfolioItemsToolsBar
                walletAddress={walletAddress}
                // walletCollectionsInitialData={walletCollectionsInitialData}
                toggleFiltersOpen={() =>
                  setItemsFiltersOpen((previous) => !previous)
                }
                setViewType={setViewType}
                viewType={viewType}
              />
            )}
          </div>
          {selectedTab === "items" && (
            <PortfolioItemsData
              viewType={viewType}
              walletTokens={walletTokens}
              collectionFilter={collectionFilter}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isOwner={isOwner}
            />
          )}
          {selectedTab === "activity" && (
            <PortfolioActivityData walletAddress={walletAddress} />
          )}
        </div>
      </div>
    </main>
  );
}
