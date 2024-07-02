import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { cn, shortAddress } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
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
import ConnectWalletModal from "~/components/connect-wallet-modal";

interface TokenOffersTableProps {
  tokenOffers: TokenOffer[];
  owner: string | null;
}

export default function TokenOffersTable({
  tokenOffers,
  owner,
}: TokenOffersTableProps) {
  const { isConnected, address } = useAccount();

  const isOwner =
    address !== undefined &&
    validateAndParseAddress(address) === validateAndParseAddress(owner ?? "");

  const showActionHeader = !isConnected || isOwner;

  return (
    <Table>
      <TableHeader className="hover:bg-background">
        <TableRow
          className={cn(
            "grid w-full items-center",
            showActionHeader ? "grid-cols-5" : "grid-cols-4",
          )}
        >
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
          {showActionHeader && (
            <TableHead className="sticky top-0 flex items-center">
              Action
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody className="block max-h-[25.5rem] overflow-auto text-sm font-semibold">
        {tokenOffers.map((offer) => {
          return (
            <TableRow
              key={offer.offer_id}
              className={cn(
                "grid h-[4.625rem] w-full items-center",
                showActionHeader ? "grid-cols-5" : "grid-cols-4",
              )}
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
              {showActionHeader && (
                <TableCell>
                  {!isConnected ? (
                    <ConnectWalletModal>
                      <Button size="xl">Connect wallet</Button>
                    </ConnectWalletModal>
                  ) : (
                    <Button>Accept offer</Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
