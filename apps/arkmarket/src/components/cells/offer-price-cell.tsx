import { TableCell } from "@ark-market/ui/table";
import { PriceTag } from "@ark-market/ui/price-tag";
import type { TokenOffer } from "~/types";

interface OfferProps {
    offer: TokenOffer;
}

export default function OfferPriceCell({ offer }: OfferProps) {
    return (
        <TableCell>
            <PriceTag price={offer.price} className="max-w-full" />
        </TableCell>
    );
}