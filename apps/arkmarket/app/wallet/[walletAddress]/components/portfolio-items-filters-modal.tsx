import type { PropsWithChildren } from "react";
import { useState } from "react";
import { useQueryState } from "nuqs";

import { Button } from "@ark-market/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@ark-market/ui/components/dialog";

import type { WalletCollectionsApiResponse } from "../queries/getWalletData";
import {
  walletCollectionFilterKey,
  walletCollectionFilterParser,
} from "../search-params";
import PortfolioItemsFiltersContent from "./portfolio-items-filters-content";

interface PortfolioItemsFiltersModal {
  walletAddress: string;
  walletCollectionsInitialData: WalletCollectionsApiResponse;
}

export default function PortfolioItemsFiltersModal({
  walletAddress,
  walletCollectionsInitialData,
  children,
}: PropsWithChildren<PortfolioItemsFiltersModal>) {
  const [open, setOpen] = useState(false);
  const [_, setCollectionFilter] = useQueryState(
    walletCollectionFilterKey,
    walletCollectionFilterParser,
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex h-full flex-col justify-between overflow-auto">
          <PortfolioItemsFiltersContent
            walletAddress={walletAddress}
            walletCollectionsInitialData={walletCollectionsInitialData}
            onFilterChange={() => setOpen(false)}
            className="mt-5 pb-5"
          />
          <div className="sticky bottom-0 grid grid-cols-2 gap-6 border-t border-border bg-background pt-5">
            <Button
              variant="secondary"
              onClick={() => {
                setCollectionFilter(null);
                setOpen(false);
              }}
            >
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
