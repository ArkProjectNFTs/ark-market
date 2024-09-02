import { useQuery } from "react-query";

import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@ark-market/ui/dialog";
import { ScrollArea } from "@ark-market/ui/scroll-area";

import type { Filters } from "~/types";
import getCollectionTraits from "~/lib/getCollectionTraits";
import CollectionItemsFiltersTrait from "./collection-items-filters-trait";

interface CollectionItemsFiltersDialogProps {
  collectionAddress: string;
  filters: Filters;
  onFiltersChange: (newFilters: Filters) => Promise<void>;
  resetFilters: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CollectionItemsFiltersDialog({
  collectionAddress,
  filters,
  onFiltersChange,
  resetFilters,
  open,
  setOpen,
}: CollectionItemsFiltersDialogProps) {
  const { data } = useQuery({
    queryKey: ["collectionTraits", collectionAddress],
    queryFn: () => getCollectionTraits({ collectionAddress }),
  });

  const handleTraitChange = async (name: string, value: string) => {
    const values = filters.traits[name] ?? [];

    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    const traits = Object.fromEntries(
      Object.entries({
        ...filters.traits,
        [name]: newValues,
      }).filter(([_, v]) => v.length > 0),
    );

    await onFiltersChange({
      ...filters,
      traits,
    });
  };

  if (!data) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="hidden">Filters</DialogTitle>
      <DialogContent
        className="p-0 sm:max-h-full sm:max-w-full"
        aria-describedby={undefined}
      >
        <div className="relative h-dvh overflow-hidden">
          <ScrollArea className="h-[calc(100vh-81px)]">
            <div className="py-5">
              <div className="px-5 py-5 text-base font-bold">Traits</div>
              <div className="flex flex-col gap-2">
                {Object.keys(data).map((key: string) => (
                  <CollectionItemsFiltersTrait
                    key={key}
                    name={key}
                    trait={data[key] ?? {}}
                    selectedTraits={filters.traits}
                    onChange={handleTraitChange}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>

          <div className="fixed bottom-0 flex w-full gap-5 border-t bg-background p-5">
            <Button
              variant="secondary"
              className="w-full"
              onClick={resetFilters}
            >
              Clear all
            </Button>
            <Button className="w-full" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
