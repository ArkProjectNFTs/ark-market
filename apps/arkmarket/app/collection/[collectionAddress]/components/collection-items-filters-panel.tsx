import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { cn } from "@ark-market/ui/lib/utils";

import CollectionItemsFiltersContent from "./collection-items-filters-content";

interface FiltersProps {
  filtersOpen: boolean;
}

export default function CollectionItemsFiltersPanel({
  className,
  filtersOpen,
}: PropsWithClassName<FiltersProps>) {
  return (
    <AnimatePresence>
      {filtersOpen && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "16rem" }}
          transition={{ ease: "easeInOut", duration: 0.15 }}
          exit={{ opacity: 0, width: 0 }}
          className={cn(
            "flex-shrink-0 overflow-y-auto overflow-x-visible",
            filtersOpen && "border-r border-border",
            className,
          )}
        >
          <CollectionItemsFiltersContent />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
