import React from "react";
import { useFulfillOffer } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { useQuery } from "react-query";
import { Web3 } from "web3";

import { Button } from "@ark-market/ui/components/button";
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
  truncateString,
} from "@ark-market/ui/lib/utils";

import { env } from "~/env";
import { getTokenOffers } from "../data";

interface TokenOffersProps {
  token: any;
}

const TokenOffers: React.FC<TokenOffersProps> = ({ token }) => {
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
  const { fulfillOffer } = useFulfillOffer();
  if (account === undefined) return null;

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
                    {isOwner && <TableHead />}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tokenOffers.offers.map((offer: any) => (
                    <TableRow className="group" key={offer.order_hash}>
                      <TableCell>
                        {`${Web3.utils.fromWei(
                          offer.offer_amount,
                          "ether",
                        )} ETH`}
                      </TableCell>
                      <TableCell>
                        {Web3.utils
                          .hexToNumber(offer.offer_quantity)
                          .toString()}
                      </TableCell>
                      <TableCell>
                        in {getRoundedRemainingTime(offer.end_date)}
                      </TableCell>
                      <TableCell>
                        {truncateString(offer.offer_maker, 8)}
                      </TableCell>
                      {isOwner && (
                        <TableCell>
                          <Button
                            className="opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => {
                              fulfillOffer({
                                starknetAccount: account,
                                brokerId: env.NEXT_PUBLIC_BROKER_ID,
                                tokenAddress: token.contract_address,
                                tokenId: token.token_id,
                                orderHash: offer.order_hash,
                              });
                            }}
                          >
                            Accept Offer
                          </Button>
                        </TableCell>
                      )}
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
