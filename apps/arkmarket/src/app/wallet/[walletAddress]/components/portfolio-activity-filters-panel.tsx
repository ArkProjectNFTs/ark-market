import type { ActivityType } from "~/types";
import ActivityFiltersContent from "~/app/collection/[collectionAddress]/components/collection-activity-filters-content";

interface PortfolioActivityFiltersPanelProps {
  open: boolean;
  setFilters: (activityTypes: ActivityType[]) => void;
  filters: ActivityType[];
}

export default function PortfolioActivityFiltersPanel({
  filters,
  open,
  setFilters,
}: PortfolioActivityFiltersPanelProps) {
  if (!open) {
    return;
  }

  return (
    <div className="sticky top-[var(--site-header-height)] hidden h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] w-72 flex-shrink-0 overflow-y-auto border-r border-border md:block">
      <ActivityFiltersContent setFilters={setFilters} filters={filters} />
    </div>
  );
}
