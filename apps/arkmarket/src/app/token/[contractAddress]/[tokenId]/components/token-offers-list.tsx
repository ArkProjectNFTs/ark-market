import { Separator } from "@ark-market/ui/separator";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import TokenOffersListItem from "./token-offers-list-item";

interface TokenOffersMobileTableProps {
  tokenOffers: TokenOffer[];
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenOffersMobileTable({
  token,
  tokenMarketData,
  tokenOffers,
}: TokenOffersMobileTableProps) {
  return (
    <>
      <Separator className="my-4" />
      {tokenOffers.map((offer, index) => (
        <TokenOffersListItem
          key={`${offer.hash}-${offer.offer_id}`}
          offer={offer}
          token={token}
          tokenMarketData={tokenMarketData}
          isLast={index === tokenOffers.length - 1}
        />
      ))}
    </>
  );
}
