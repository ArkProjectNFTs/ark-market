import { cn, focusableStyles } from "@ark-market/ui";
import { Checkbox } from "@ark-market/ui/checkbox";

import type { ActivityType } from "~/types";
import activityTypeMetadata from "~/constants/activity-type-metadata";

interface CollectionActivityFiltersContentProps {
  setFilters: (activityTypes: ActivityType[]) => void;
  filters: ActivityType[];
}

export default function CollectionActivityFiltersContent({
  filters,
  setFilters,
}: CollectionActivityFiltersContentProps) {
  return (
    <div className="h-full overflow-auto">
      <p className="px-5 pb-5 pt-6 text-base font-semibold">Event type</p>
      <div className="flex flex-col gap-2 px-5 pb-5 md:px-2 md:pb-0">
        {Object.entries(activityTypeMetadata).map(
          ([activityType, activityObject], index) => {
            const isSelected = filters.includes(activityType as ActivityType);

            return (
              <button
                className={cn(
                  "flex h-12 items-center gap-3 rounded-xs bg-transparent px-3 text-sm font-semibold transition-colors hover:bg-card",
                  focusableStyles,
                )}
                key={index}
                onClick={() =>
                  isSelected
                    ? setFilters(
                        [...filters].filter(
                          (activity) => activity !== activityType,
                        ),
                      )
                    : setFilters([...filters, activityType as ActivityType])
                }
              >
                <Checkbox checked={isSelected} className="mr-1" />
                {activityObject.icon}
                <p>{activityObject.title} </p>
              </button>
            );
          },
        )}
      </div>
    </div>
  );
}
