import { shortAddress } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { TokenOffer } from "../queries/getTokenData";
import TokenOffersTableAction from "./token-offers-table-action";

interface TokenOffersTableProps {
  tokenOffers: TokenOffer[];
  tokenContractAdress: string;
  tokenId: string;
  owner: string | null;
}

export default function TokenOffersTable({
  tokenOffers,
  owner,
  tokenContractAdress,
  tokenId,
}: TokenOffersTableProps) {
  return (
    <Table>
      <TableHeader className="hover:bg-background">
        <TableRow className="grid w-full grid-cols-5 items-center">
          <TableHead className="sticky top-0 flex items-center">
            Price
          </TableHead>
          <TableHead className="sticky top-0 flex items-center">
            Floor difference
          </TableHead>
          <TableHead className="sticky top-0 flex items-center">From</TableHead>
          <TableHead className="sticky top-0 flex items-center">
            Expiration
          </TableHead>
          <TableHead className="sticky top-0 flex items-center">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="block max-h-[25.5rem] overflow-auto text-sm font-semibold">
        {tokenOffers.map((offer) => {
          return (
            <TableRow
              key={offer.offer_id}
              className="grid h-[4.625rem] w-full grid-cols-5 items-center"
            >
              <TableCell>
                <PriceTag price={offer.price} />
              </TableCell>
              {/* TODO @YohanTz: Check how this one looks */}
              <TableCell>{offer.floor_difference ?? "_"}</TableCell>
              <TableCell>
                {offer.source ? shortAddress(offer.source) : "_"}
              </TableCell>
              <TableCell>{offer.expire_at}</TableCell>
              <TableCell>
                <TokenOffersTableAction
                  owner={owner}
                  offerSourceAddress={offer.source}
                  offerOrderHash={offer.hash}
                  tokenContractAddress={tokenContractAdress}
                  tokenId={tokenId}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
