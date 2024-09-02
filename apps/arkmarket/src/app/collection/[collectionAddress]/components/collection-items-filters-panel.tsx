import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

import { cn } from "@ark-market/ui";
import { Checkbox } from "@ark-market/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";

import type { CollectionTrait, Filters } from "~/types";
import getCollectionTraits from "~/lib/getCollectionTraits";

interface CollectionItemsFiltersTraitProps {
  name: string;
  trait: CollectionTrait;
  selectedTraits?: Record<string, string[]>;
  onChange: (traitName: string, value: string) => void;
}

function CollectionItemsFiltersTrait({
  name,
  trait,
  selectedTraits = {},
  onChange,
}: CollectionItemsFiltersTraitProps) {
  const [isOpen, setIsOpen] = useState(false);
  const count = Object.values(trait).reduce((acc, curr) => acc + curr, 0);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="flex justify-between px-5">
          <div className="mb-2 font-semibold">{name}</div>
          <div className="flex gap-2">
            <div className="font-semibold text-muted-foreground">{count}</div>
            <ChevronDown
              className={cn(
                "-mr-1 h-6 w-6 transition-all",
                isOpen && "rotate-180",
              )}
            />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-1 px-3">
          {Object.keys(trait).map((key) => (
            <label
              key={`${name}-${key}`}
              htmlFor={`${name}-${key}`}
              className="flex cursor-pointer justify-between rounded p-2 leading-none transition-all hover:bg-muted"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  id={`${name}-${key}`}
                  checked={!!selectedTraits[name]?.includes(key)}
                  onClick={() => onChange(name, key)}
                />
                <div className="max-w-40 truncate leading-tight">{key}</div>
              </div>
              <div className="text-muted-foreground">{trait[key]}</div>
            </label>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface CollectionItemsFiltersPanelProps {
  collectionAddress: string;
  onFiltersChange: (newFilters: Filters) => Promise<void>;
  filters: Filters;
}

export default function CollectionItemsFiltersPanel({
  collectionAddress,
  onFiltersChange,
  filters,
}: CollectionItemsFiltersPanelProps) {
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
    <div className="no-scrollbar sticky top-[var(--site-header-height)] z-10 hidden h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] w-64 flex-shrink-0 overflow-y-auto border-r border-border sm:block">
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
