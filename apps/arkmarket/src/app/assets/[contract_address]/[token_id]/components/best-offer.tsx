import { formatEther } from "viem";

import type { Token, TokenMarketData } from "~/types";
import AcceptBestOffer from "./accept-best-offer";
import CreateOffer from "./create-offer";

interface BestOfferProps {
  token: Token;
  tokenMarketData: TokenMarketData | undefined;
  isOwner: boolean;
}

export function BestOffer({ token, tokenMarketData, isOwner }: BestOfferProps) {
  return (
    <div className="flex w-full flex-col space-y-4 rounded border p-4">
      <div className="">
        <div className="text-muted-foreground">Best offer</div>
        <div className="text-2xl font-bold">
          {tokenMarketData?.top_bid.amount
            ? formatEther(BigInt(tokenMarketData.top_bid.amount))
            : "-"}{" "}
          ETH
        </div>
      </div>
      {isOwner ? (
        <AcceptBestOffer token={token} tokenMarketData={tokenMarketData} />
      ) : (
        <CreateOffer token={token} tokenMarketData={tokenMarketData} />
      )}
    </div>
  );
}

export default BestOffer;
