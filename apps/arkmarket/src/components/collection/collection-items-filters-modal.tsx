import type { PropsWithChildren } from "react";

import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";

import CollectionItemsFiltersContent from "./collection-items-filters-content";

export default function CollectionItemsFiltersModal({
  children,
  //   filtersOpen,
}: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">Filters</DialogTitle>
        <div className="flex h-full flex-col justify-between">
          <CollectionItemsFiltersContent />
          <div>
            <Button className="w-full" size="xl">
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
