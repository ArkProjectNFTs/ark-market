import { AnimatePresence, motion } from "framer-motion";

import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import { cn } from "@ark-market/ui/lib/utils";

import PortfolioItemsFiltersContent from "./portfolio-items-filters-content";

interface PortfolioItemsFitlersPanelProps {
  filtersOpen: boolean;
}

export default function PortfolioItemsFitlersPanel({
  className,
  filtersOpen,
}: PropsWithClassName<PortfolioItemsFitlersPanelProps>) {
  return (
    <div>
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
            <PortfolioItemsFiltersContent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
