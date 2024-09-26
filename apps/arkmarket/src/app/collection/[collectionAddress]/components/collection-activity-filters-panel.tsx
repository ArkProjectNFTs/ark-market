import type { ActivityType } from "~/types";
import CollectionActivityFiltersContent from "./collection-activity-filters-content";

interface CollectionActivityFiltersPanelProps {
  open: boolean;
  setFilters: (activityTypes: ActivityType[]) => void;
  filters: ActivityType[];
}

export default function CollectionActivityFiltersPanel({
  open,
  setFilters,
  filters,
}: CollectionActivityFiltersPanelProps) {
  if (!open) {
    return;
  }
  return (
    <div className="sticky top-[var(--site-header-height)] z-10 hidden h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] w-64 flex-shrink-0 overflow-y-auto border-r border-border md:block">
      <CollectionActivityFiltersContent
        setFilters={setFilters}
        filters={filters}
      />
    </div>
  );
}
