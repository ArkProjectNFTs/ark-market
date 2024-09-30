import { PriceTag } from "@ark-market/ui/price-tag";
import type { CollectionActivity, PortfolioActivity, PortfolioOffers } from "~/types";
import { TableCell } from "@ark-market/ui/table";

interface PriceCellProps {
  activity: CollectionActivity | PortfolioActivity | PortfolioOffers;
}

export default function PriceCell({ activity }: PriceCellProps) {
  return (
    <TableCell className="flex w-[25%]">
       {activity.price ? (
                  <PriceTag price={activity.price} className="max-w-full" />
                ) : (
                  "_"
                )}
    </TableCell>
  );
}
