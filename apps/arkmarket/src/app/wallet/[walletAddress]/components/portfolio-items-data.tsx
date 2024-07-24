"use client";

import type { WalletToken } from "../queries/getWalletData";
import type { ViewType } from "~/components/view-type-toggle-group";
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
}

export default function PortfolioItemsData({
  viewType,
  // walletTokensInitialData,
  collectionFilter,
  walletTokens,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: PortfolioItemsDataProps) {
  // const isSSR = useIsSSR();
  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  if (viewType === "list") {
    return <PortfolioItemsDataListView walletTokens={walletTokens} />;
  }

  return (
    <div className="mb-6">
      <PortfolioItemsDataGridView
        key={collectionFilter}
        walletTokens={walletTokens}
        viewType={viewType}
      />
    </div>
  );
}
