import { X } from "lucide-react";

interface CollectionNavProps {
  traits: Record<string, string[]>;
  onRemove: (key: string, value: string) => Promise<void>;
  onReset: () => Promise<void>;
}

export default function CollectionItemsFiltersTraits({
  traits,
  onRemove,
  onReset,
}: CollectionNavProps) {
  if (Object.keys(traits).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-4 px-5 pb-5">
      {Object.keys(traits).map((key) => (
        <>
          {traits[key]?.map((value) => (
            <div
              key={`${key}-${value}`}
              className="flex cursor-pointer items-center gap-2 rounded-md bg-muted px-4 py-3"
              onClick={() => onRemove(key, value)}
            >
              <div className="text-sm leading-none">
                {key}: {value}
              </div>
              <X className="size-4" />
            </div>
          ))}
        </>
      ))}

      <div
        className="flex cursor-pointer items-center gap-2 rounded-md bg-muted px-4 py-3 text-sm leading-none"
        onClick={onReset}
      >
        Clear all
      </div>
    </div>
  );
}
