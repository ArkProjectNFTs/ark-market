import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { shortAddress } from "@ark-market/ui";
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
  owner: string;
}

export default function TokenOffersTable({
  tokenOffers,
  owner,
}: TokenOffersTableProps) {
  const { isConnected, address } = useAccount();

  const isOwner =
    address !== undefined &&
    validateAndParseAddress(address) === validateAndParseAddress(owner);

  const showActionHeader = !isConnected || isOwner;

  return (
    <Table className="w-full">
      <TableHeader className="hover:bg-background">
        <TableHead>Price</TableHead>
        <TableHead>Floor difference</TableHead>
        <TableHead>From</TableHead>
        <TableHead>Expiration</TableHead>
        {showActionHeader && <TableHead>Action</TableHead>}
      </TableHeader>
      <TableBody className="text-sm font-semibold">
        {tokenOffers.map((offer) => {
          return (
            <TableRow key={offer.offer_id}>
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
