"use client";

import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import { getRoundedRemainingTime } from "@ark-market/ui";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";
import TokenOffersTableAction from "./token-offers-table-action";

interface TokenFloorDifferenceProps {
  floor_difference: number | null;
}

function TokenFloorDifference({ floor_difference }: TokenFloorDifferenceProps) {
  if (floor_difference === null) {
    return "_";
  }

  if (floor_difference < 0) {
    return (
      <p className="text-sm font-medium text-red-500">{floor_difference}%</p>
    );
  }

  return (
    <p className="text-sm font-medium text-green-500">+{floor_difference}%</p>
  );
}

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
    <div className="hidden lg:block">
      <Table>
        <TableHeader className="hover:bg-background">
          <TableRow className="grid w-full grid-cols-5 items-center">
            <TableHead className="sticky top-0 flex items-center">
              Price
            </TableHead>
            <TableHead className="sticky top-0 flex items-center">
              Floor difference
            </TableHead>
            <TableHead className="sticky top-0 flex items-center">
              From
            </TableHead>
            <TableHead className="sticky top-0 flex items-center">
              Expiration
            </TableHead>
            <TableHead className="sticky top-0 flex items-center justify-end">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-numbers block overflow-auto text-sm font-medium">
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
                <TableCell>
                  <TokenFloorDifference
                    floor_difference={offer.floor_difference}
                  />
                </TableCell>
                <TableCell>
                  <Link href={`/wallet/${offer.source}`}>
                    {ownerOrShortAddress({
                      ownerAddress: offer.source,
                      address,
                    })}
                  </Link>
                </TableCell>
                <TableCell>
                  In {getRoundedRemainingTime(offer.expire_at)}
                </TableCell>
                <TableCell className="text-end">
                  <TokenOffersTableAction
                    offer={offer}
                    token={token}
                    tokenMarketData={tokenMarketData}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
