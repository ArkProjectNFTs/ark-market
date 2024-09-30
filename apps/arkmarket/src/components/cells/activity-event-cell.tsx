import { TableCell } from "@ark-market/ui/table";
import activityTypeMetadata from "~/constants/activity-type-metadata";
import type { CollectionActivity, TokenActivity } from "~/types";

interface EventCellProps {
  activity: CollectionActivity | TokenActivity ;
}

export default function EventCell({ activity }: EventCellProps) {
  return (
    <TableCell className="items-center gap-4 whitespace-nowrap pl-5">
      <div className="flex items-center gap-4 whitespace-nowrap">
        {activityTypeMetadata[activity.activity_type].icon}
        <p>{activityTypeMetadata[activity.activity_type].title}</p>
      </div>
    </TableCell>
  );
}
