import { PriceTag } from "@ark-market/ui/price-tag";
import { TableCell } from "@ark-market/ui/table";

import type {
  CollectionActivity,
  PortfolioActivity,
  PortfolioOffers,
} from "~/types";

interface PriceCellProps {
  activity: CollectionActivity | PortfolioActivity | PortfolioOffers;
}

export default function PriceCell({ activity }: PriceCellProps) {
  return (
    <TableCell className="flex">
      {activity.price ? (
        <PriceTag
          price={activity.price}
          currency={activity.currency}
          className="max-w-full"
        />
      ) : (
        "_"
      )}
    </TableCell>
  );
}
