import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@ark-market/ui";
import { Checkbox } from "@ark-market/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";

import type { CollectionTrait } from "~/types";

interface CollectionItemsFiltersTraitProps {
  name: string;
  trait: CollectionTrait;
  selectedTraits?: Record<string, string[]>;
  onChange: (traitName: string, value: string) => void;
}

export default function CollectionItemsFiltersTrait({
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
