import { TableCell } from "@ark-market/ui/table";
import { cn } from "@ark-market/ui";
import type { TokenOffer } from "~/types";

interface FloorDiffProps {
    offer: TokenOffer;
}

export default function OfferFloorDiffCell({ offer }: FloorDiffProps) {
    return (
        <TableCell>
            {offer.floor_difference ? (
                <p
                    className={cn(
                        "text-sm font-medium",
                        offer.floor_difference >= 0 ? "text-green-500" : "text-red-500",
                    )}
                >
                    {offer.floor_difference}%
                </p>
            ) : (
                "_"
            )}
        </TableCell>
    );
}