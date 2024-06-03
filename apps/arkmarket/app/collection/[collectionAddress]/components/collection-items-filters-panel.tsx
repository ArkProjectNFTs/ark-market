import type { HTMLAttributes } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

const filtersRemWidth = 16;

export default function CollectionItemsFiltersPanel({
  className,
  filtersOpen,
  style,
}: PropsWithClassName<FiltersProps>) {
  return (
    <AnimatePresence>
      {filtersOpen && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: `${filtersRemWidth}rem` }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          exit={{ opacity: 0, width: 0 }}
          className={cn(
            "flex-shrink-0 overflow-y-auto overflow-x-visible",
            filtersOpen && "border-r border-border",
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
