import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Filter } from "@ark-market/ui/icons";
import { SearchInput } from "@ark-market/ui/search-input";

// import type { WalletCollectionsApiResponse } from "../queries/getWalletData";
import type { ViewType } from "~/components/view-type-toggle-group";
import ViewTypeToggleButton from "~/components/view-type-toggle-button";
import ViewTypeToggleGroup from "~/components/view-type-toggle-group";
import PortfolioItemsFiltersModal from "./portfolio-items-filters-modal";

interface PortfolioItemsToolsBarProps {
  toggleFiltersOpen: () => void;
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
  walletAddress: string;
  // walletCollectionsInitialData: WalletCollectionsApiResponse;
}
export default function PortfolioItemsToolsBar({
  className,
  toggleFiltersOpen,
  viewType,
  setViewType,
  walletAddress,
  // walletCollectionsInitialData,
}: PropsWithClassName<PortfolioItemsToolsBarProps>) {
  return (
    <div className={cn("mt-4 bg-background sm:mt-6", className)}>
      <div className="flex items-center gap-2 md:gap-6">
        <PortfolioItemsFiltersModal
          walletAddress={walletAddress}
          // walletCollectionsInitialData={walletCollectionsInitialData}
        >
          <Button variant="secondary" size="icon-xl" className="sm:hidden">
            <Filter />
          </Button>
        </PortfolioItemsFiltersModal>
        <Button
          onClick={toggleFiltersOpen}
          variant="secondary"
          size="xl"
          className="hidden sm:flex"
        >
          <Filter />
          <span>Filters</span>
        </Button>

        <SearchInput className="flex-1" placeholder="Search item" />

        {/* <PortfolioItemsSortingSelect
          className="hidden lg:block"
          sortBy={sortBy}
          setSortBy={setSortBy}
          setSortDirection={setSortDirection}
          sortDirection={sortDirection}
        /> */}

        <ViewTypeToggleGroup
          className="hidden md:flex"
          setViewType={setViewType}
          viewType={viewType}
        />
        <ViewTypeToggleButton
          className="md:hidden"
          setViewType={setViewType}
          viewType={viewType}
        />
      </div>
    </div>
  );
}
