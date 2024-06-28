"use client";

import { useRef } from "react";

// import { useInView } from "framer-motion";

import type { Token, TokenMarketData } from "~/types";
import TokenActionsAcceptBestOffer from "./token-actions-accept-best-offer";
// import TokenActionsBar from "./token-actions-bar";
import TokenActionsCancelListing from "./token-actions-cancel-listing";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeBid from "./token-actions-make-bid";
import TokenActionsMakeOffer from "./token-actions-make-offer";
import TokenActionsBuyNow from "./tokens-actions-buy-now";

interface TokenActionsButtonsProps {
  isListed: boolean;
  isAuction: boolean;
  hasOffers: boolean;
  isOwner: boolean;
  startAmount: string;
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenActionsButtons({
  isListed,
  isAuction,
  hasOffers,
  isOwner,
  // startAmount,
  token,
  tokenMarketData,
}: TokenActionsButtonsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  // const isActionItemsInView = useInView(ref, { margin: "-72px 0px 0px 0px" });

  return (
    <>
      {/* {isActionItemsInView || <TokenActionsBar />} */}
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8" ref={ref}>
        {isOwner ? (
          <>
            {isListed ? (
              <>
                {hasOffers && (
                  <TokenActionsAcceptBestOffer
                    token={token}
                    tokenMarketData={tokenMarketData}
                    isAuction={isAuction}
                  />
                )}
                <TokenActionsCancelListing
                  token={token}
                  tokenMarketData={tokenMarketData}
                />
              </>
            ) : (
              <TokenActionsCreateListing
                token={token}
                tokenMarketData={tokenMarketData}
              />
            )}
          </>
        ) : (
          <>
            {isListed && (
              <>
                {isAuction ? (
                  <>
                    <TokenActionsMakeBid
                      token={token}
                      tokenMarketData={tokenMarketData}
                    />
                  </>
                ) : (
                  <TokenActionsBuyNow
                    token={token}
                    tokenMarketData={tokenMarketData}
                  />
                )}
              </>
            )}
            <TokenActionsMakeOffer
              token={token}
              tokenMarketData={tokenMarketData}
            />
          </>
        )}
      </div>
    </>
  );
}
