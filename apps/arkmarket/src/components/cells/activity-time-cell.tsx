import { timeSince } from "@ark-market/ui";
import { TableCell } from "@ark-market/ui/table";

interface ActivityProps {
  timeStamp: number | null;
}

export default function ActivityTime({ timeStamp }: ActivityProps) {
  return (
    <TableCell>
      <p className="whitespace-nowrap">
        {timeStamp ? timeSince(timeStamp) : "_"}
      </p>
    </TableCell>
  );
}
