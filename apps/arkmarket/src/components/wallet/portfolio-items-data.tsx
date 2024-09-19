"use client";

import type { ViewType } from "~/components/view-type-toggle-group";
import type { WalletToken } from "~/lib/getWalletData";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import PortfolioItemsDataGridView from "./portfolio-items-data-grid-view";
import PortfolioItemsDataListView from "./portfolio-items-data-list-view";

interface PortfolioItemsDataProps {
  // walletTokensInitialData: WalletTokensApiResponse;
  viewType: ViewType;
  collectionFilter: string | null;
  walletTokens: WalletToken[];
  fetchNextPage: () => Promise<unknown>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isOwner: boolean;
}

export default function PortfolioItemsData({
  viewType,
  // walletTokensInitialData,
  collectionFilter,
  walletTokens,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isOwner,
}: PortfolioItemsDataProps) {
  // const isSSR = useIsSSR();
  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (viewType === "list") {
    return (
      <PortfolioItemsDataListView
        walletTokens={walletTokens}
        isOwner={isOwner}
      />
    );
  }

  return (
    <div className="mb-6">
      <PortfolioItemsDataGridView
        key={collectionFilter}
        walletTokens={walletTokens}
        viewType={viewType}
        isOwner={isOwner}
      />
    </div>
  );
}
