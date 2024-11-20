import { PriceTag } from "@ark-market/ui/price-tag";
import { TableCell } from "@ark-market/ui/table";

import type { TokenOffer } from "~/types";

interface OfferProps {
  offer: TokenOffer;
}

export default function OfferPriceCell({ offer }: OfferProps) {
  return (
    <TableCell>
      <PriceTag
        price={offer.price}
        currency={offer.currency}
        className="max-w-full"
      />
    </TableCell>
  );
}
