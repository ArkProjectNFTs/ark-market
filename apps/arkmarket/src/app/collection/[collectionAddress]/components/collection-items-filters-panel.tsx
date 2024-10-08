import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";

import { SearchInput } from "@ark-market/ui/search-input";

import type { Filters } from "~/types";
import getCollectionTraits from "~/lib/getCollectionTraits";
import CollectionItemsFiltersTrait from "./collection-items-filters-trait";

interface CollectionItemsFiltersPanelProps {
  collectionAddress: string;
  filters: Filters;
  onFiltersChange: (newFilters: Filters) => Promise<void>;
  isOpen: boolean;
}

export default function CollectionItemsFiltersPanel({
  collectionAddress,
  filters,
  onFiltersChange,
  isOpen,
}: CollectionItemsFiltersPanelProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["collectionTraits", collectionAddress],
    queryFn: () => getCollectionTraits({ collectionAddress }),
  });
  const [searchQuery, setSearchQuery] = useState("");

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

  if (!isOpen) {
    return null;
  }

  const filteredData = Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      const filtered = Object.fromEntries(
        Object.entries(value).filter(([k]) =>
          k.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );

      return [key, filtered];
    }),
  );

  const hasTraits = Object.values(filteredData).some(
    (trait) => Object.keys(trait).length > 0,
  );

  return (
    <div className="no-scrollbar sticky top-[var(--site-header-height)] z-10 hidden h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] w-64 flex-shrink-0 overflow-y-auto border-r border-border lg:block">
      <div className="">
        <div className="px-5 py-4 text-base font-bold">Traits</div>
        <div className="px-4 pb-4">
          {hasTraits && (
            <SearchInput
              value={searchQuery}
              className="h-10"
              placeholder="Search"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        </div>
        <div className="flex flex-col gap-2">
          {searchQuery.length > 0 && !hasTraits && (
            <div className="px-5">
              <div className="mb-2 text-sm text-muted-foreground">
                No traits found for "{searchQuery}"
              </div>
            </div>
          )}
          {Object.keys(filteredData).map((key: string) => (
            <CollectionItemsFiltersTrait
              key={key}
              name={key}
              trait={filteredData[key] ?? {}}
              selectedTraits={filters.traits}
              onChange={handleTraitChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
