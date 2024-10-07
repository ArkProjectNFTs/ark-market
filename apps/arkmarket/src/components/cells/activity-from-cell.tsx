import Link from "next/link";

import { TableCell } from "@ark-market/ui/table";

import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface PriceCellProps {
  ownerAddress: string;
  address: string | undefined;
}

export default function ActivityToFromCell({
  ownerAddress,
  address,
}: PriceCellProps) {
  return (
    <TableCell>
      {ownerAddress ? (
        <Link href={`/wallet/${ownerAddress}`} className="text-primary">
          {ownerOrShortAddress({
            ownerAddress,
            address,
          })}
        </Link>
      ) : (
        "_"
      )}
    </TableCell>
  );
}
