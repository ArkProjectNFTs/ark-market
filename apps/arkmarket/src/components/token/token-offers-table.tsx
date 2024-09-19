"use client";

import { useAccount } from "@starknet-react/core";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import TokenOffersTableItem from "./token-offers-table-row";

interface TokenOffersTableProps {
  tokenOffers: TokenOffer[];
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenOffersTable({
  tokenOffers,
  token,
  tokenMarketData,
}: TokenOffersTableProps) {
  const { address } = useAccount();

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
          <TableHead className="sticky top-0 flex items-center justify-end">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="font-numbers block overflow-auto text-sm font-medium">
        {tokenOffers.map((offer) => (
          <TokenOffersTableItem
            key={offer.offer_id}
            address={address}
            offer={offer}
            token={token}
            tokenMarketData={tokenMarketData}
          />
        ))}
      </TableBody>
    </Table>
  );
}
