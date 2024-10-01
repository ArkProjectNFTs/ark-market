import { timeSinceShort } from "@ark-market/ui";
import { TableCell } from "@ark-market/ui/table";

import type { CollectionToken } from "~/types";

interface TokenTimeListedCellProps {
  token: CollectionToken;
}

export default function TokenTimeListedCell({
  token,
}: TokenTimeListedCellProps) {
  return (
    <TableCell className="flex w-[10%] whitespace-nowrap">
      {token.listed_at ? timeSinceShort(token.listed_at) : "_"}
    </TableCell>
  );
}
