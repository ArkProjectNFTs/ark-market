import { X } from "lucide-react";

import { Button } from "@ark-market/ui/button";

interface CollectionItemsFiltersTraitsProps {
  traits: Record<string, string[]>;
  onRemove: (key: string, value: string) => Promise<void>;
  onReset: () => Promise<void>;
}

export default function CollectionItemsFiltersTraits({
  traits,
  onRemove,
  onReset,
}: CollectionItemsFiltersTraitsProps) {
  if (Object.keys(traits).length === 0) {
    return null;
  }

  return (
    <div className="hidden flex-wrap items-center gap-4 px-5 pb-5 lg:flex">
      {Object.keys(traits).map((key) =>
        traits[key]?.map((value) => (
          <Button
            key={`${key}-${value}`}
            className="flex cursor-pointer items-center gap-2 rounded-md bg-muted px-4 py-3"
            variant="outline"
            onClick={() => onRemove(key, value)}
          >
            <div className="text-sm leading-none">
              {key}: {value}
            </div>
            <X className="size-4" />
          </Button>
        )),
      )}
      <Button
        className="flex cursor-pointer items-center gap-2 rounded-md bg-muted px-4 py-3 text-sm leading-none"
        variant="outline"
        onClick={onReset}
      >
        Clear all
      </Button>
    </div>
  );
}
