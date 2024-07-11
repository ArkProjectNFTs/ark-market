"use client";

import { Meh } from "lucide-react";

import type { Collection, Token } from "~/types";
import { TokenActionsCreateListing } from "./token-actions-create-listing";
import TokenActionsMakeOffer from "./token-actions-make-offer";

interface TokenActionsEmptyProps {
  collection: Collection;
  token: Token;
  tokenId: string;
  isOwner: boolean;
}

export default function TokenActionsEmpty({
  collection,
  token,
  tokenId,
  isOwner,
}: TokenActionsEmptyProps) {
  return (
    <div className="rounded-lg bg-card p-5 text-center lg:px-8 lg:pb-10 lg:pt-8">
      <div className="flex flex-col items-center pb-8 text-muted-foreground">
        <Meh size={42} className="flex-shrink-0" />
        <p className="mt-3 text-center text-xl font-semibold">
          {isOwner
            ? "You have not assigned a price to your token yet."
            : "This token has not been listed yet."}
        </p>
      </div>
      {isOwner ? (
        <TokenActionsCreateListing
          collection={collection}
          token={token}
          tokenId={tokenId}
        />
      ) : (
        <TokenActionsMakeOffer
          collection={collection}
          token={token}
          tokenId={tokenId}
        />
      )}
    </div>
  );
}
