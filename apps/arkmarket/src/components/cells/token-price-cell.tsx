import { LoaderCircle } from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
import type { CollectionToken } from "~/types";
import { TableCell } from "@ark-market/ui/table";

interface PriceCellProps {
  token: CollectionToken;
}

export default function TokenPriceCell({ token }: PriceCellProps) {
  return (
    <TableCell className="flex w-[25%]">
      {token.buy_in_progress ? (
        <div className="flex h-10 items-center justify-center text-nowrap rounded bg-primary px-3 text-sm text-background">
          Buy in progress
          <LoaderCircle className="ml-4 size-4 animate-spin" />
        </div>
      ) : token.price ? (
        <PriceTag price={token.price} />
      ) : (
        "_"
      )}
    </TableCell>
  );
}
