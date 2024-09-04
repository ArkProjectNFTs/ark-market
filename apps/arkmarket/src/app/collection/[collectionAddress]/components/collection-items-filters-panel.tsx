import { useSuspenseQuery } from "@tanstack/react-query";

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

  return (
    <div className="no-scrollbar sticky top-[var(--site-header-height)] z-10 hidden h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] w-64 flex-shrink-0 overflow-y-auto border-r border-border lg:block">
      <div className="">
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
    </div>
  );
}
