"use client";

import { useState } from "react";

import type { WalletTokensApiResponse } from "../queries/getWalletData";
import PortfolioItemsFiltersPanel from "./portfolio-items-filters-panel";
import PortfolioItemsToolsBar from "./portfolio-items-tools-bar";

interface PortfolioProps {
  walletTokensInitialData: WalletTokensApiResponse;
}

export default function Portfolio() {
  const [itemsFiltersOpen, setItemsFiltersOpen] = useState(false);

  return (
    <div className="flex">
      <PortfolioItemsFiltersPanel filtersOpen={itemsFiltersOpen} />
      <div className="sticky top-[var(--site-header-height)] z-10 bg-background p-6">
        <PortfolioItemsToolsBar
          toggleFiltersOpen={() => setItemsFiltersOpen((previous) => !previous)}
        />
      </div>
    </div>
  );
}
