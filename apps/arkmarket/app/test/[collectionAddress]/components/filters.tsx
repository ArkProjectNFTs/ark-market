import type { HTMLAttributes } from "react";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { Label } from "@ark-market/ui/components/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@ark-market/ui/components/radio-group";
import { cn } from "@ark-market/ui/lib/utils";

interface FiltersProps {
  filtersOpen: boolean;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export default function Filters({
  className,
  filtersOpen,
  style,
}: PropsWithClassName<FiltersProps>) {
  return (
    <div
      className={cn(
        "flex-shrink-0 overflow-y-auto overflow-x-visible transition-[width,opacity]",
        filtersOpen
          ? "w-64 border-r border-border opacity-100"
          : "w-0 opacity-0",
        className,
      )}
      style={style}
    >
      <p className="px-5 pt-6 font-bold">Status</p>

      <RadioGroup
        defaultValue="show-all"
        className="mt-6 whitespace-nowrap px-5 pb-6"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="show-all" id="show-all" />
          <Label htmlFor="show-all">Show all</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="buy-now" id="buy-now" />
          <Label htmlFor="buy-now">Buy now</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
