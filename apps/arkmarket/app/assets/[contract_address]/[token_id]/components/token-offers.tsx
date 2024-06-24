import React from "react";
import { useOrderType } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { useQuery } from "react-query";
import { formatEther, hexToNumber } from "viem";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/components/table";
import {
  areAddressesEqual,
  getRoundedRemainingTime,
  shortAddress,
} from "@ark-market/ui/lib/utils";

import type { Token, TokenMarketData } from "~/types/schema";
import { getTokenOffers } from "../data";
import AcceptOffer from "./accept-offer";
import CancelOffer from "./cancel-offer";

interface TokenOffersProps {
  token: Token;
  tokenMarketData: TokenMarketData | null;
}

const TokenOffers: React.FC<TokenOffersProps> = ({
  token,
  tokenMarketData,
}) => {
  const {
    data: tokenOffers,
    error: tokenOffersError,
    isLoading: tokenOffersIsLoading,
  }: any = useQuery(
    "tokenOffers",
    () =>
      getTokenOffers({
        contract_address: token.contract_address,
        token_id: token.token_id,
      }),
    {
      refetchInterval: 10000,
    },
  );
  const { address, account } = useAccount();

  const isOwner = address && areAddressesEqual(token.owner, address);

  if (!account) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="p-y-6 flex flex-col space-y-1.5 pb-2 pt-4">
        <h3 className="font-semibold leading-none tracking-tight">Offers</h3>
        <p className="text-sm text-muted-foreground">
          View and accept offers for this item
        </p>
      </div>
      <div className="rounded-md border">
        {tokenOffersError ||
        !tokenOffers?.offers ||
        tokenOffers.offers.length === 0 ? (
          <div className="p-4 text-center text-sm [&_p]:leading-relaxed">
            No offers available
          </div>
        ) : (
          <>
            {tokenOffersIsLoading ? (
              <div className="p-4 text-center text-sm [&_p]:leading-relaxed">
                Loading...
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokenOffers.offers.map((offer: any) => (
                    <TableRow className="group" key={offer.order_hash}>
                      <TableCell>
                        {`${formatEther(BigInt(offer.offer_amount))} ETH`}
                      </TableCell>
                      <TableCell>{hexToNumber(offer.offer_quantity)}</TableCell>
                      <TableCell>
                        in {getRoundedRemainingTime(offer.end_date)}
                      </TableCell>
                      <TableCell>
                        {areAddressesEqual(address, offer.offer_maker)
                          ? "You"
                          : shortAddress(offer.offer_maker)}
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <div className="flex space-x-2">
                          {isOwner && tokenMarketData !== null && (
                            <AcceptOffer
                              token={token}
                              tokenMarketData={tokenMarketData}
                              offer={offer}
                            />
                          )}
                          {areAddressesEqual(offer.offer_maker, address) && (
                            <CancelOffer token={token} offer={offer} />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TokenOffers;
