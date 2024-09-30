import { TableCell } from "@ark-market/ui/table";
import { timeSince } from "@ark-market/ui";

interface ActivityProps {
   time_stamp: number | null;
}

export default function ActivityTime({time_stamp}: ActivityProps) {
    return (
        <TableCell>
            <p className="whitespace-nowrap">
                {time_stamp ? timeSince(time_stamp) : "_"}
            </p>
        </TableCell>
    )
}