"use client";

import type { WalletToken } from "../queries/getWalletData";
import type { ViewType } from "~/components/view-type-toggle-group";
import PortfolioItemsDataGridView from "./portfolio-items-data-grid-view";
import PortfolioItemsDataListView from "./portfolio-items-data-list-view";

interface PortfolioItemsDataProps {
  // walletTokensInitialData: WalletTokensApiResponse;
  viewType: ViewType;
  walletAddress: string;
  collectionFilter: string | null;
  walletTokens: WalletToken[];
}

export default function PortfolioItemsData({
  viewType,
  // walletTokensInitialData,
  collectionFilter,
  walletTokens,
}: PortfolioItemsDataProps) {
  // const isSSR = useIsSSR();

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
