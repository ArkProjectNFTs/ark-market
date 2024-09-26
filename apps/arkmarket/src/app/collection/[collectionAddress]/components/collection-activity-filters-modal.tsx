import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@ark-market/ui/dialog";
import { Separator } from "@ark-market/ui/separator";

import type { ActivityType } from "~/types";
import CollectionActivityFiltersContent from "./collection-activity-filters-content";

interface CollectionActivityFiltersModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setFilters: (activityTypes: ActivityType[]) => void;
  filters: ActivityType[];
}

export default function CollectionActivityFiltersModal({
  filters,
  open,
  setFilters,
  setOpen,
}: CollectionActivityFiltersModalProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="sr-only">Event type</DialogTitle>
      <DialogContent className="gap-0 px-0">
        <CollectionActivityFiltersContent
          filters={filters}
          setFilters={setFilters}
        />
        <div>
          <Separator className="mb-4" />
          <div className="grid grid-cols-2 gap-6 px-5">
            <Button
              variant="secondary"
              onClick={() => {
                setFilters([]);
              }}
            >
              Clear all
            </Button>
            <Button variant="default" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
