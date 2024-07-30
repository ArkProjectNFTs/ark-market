import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { Button } from "@ark-market/ui/button";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import ConnectWalletModal from "~/components/connect-wallet-modal";
import AcceptOffer from "./accept-offer";
import CancelOffer from "./cancel-offer";

interface TokenOffersTableActionProps {
  offer: TokenOffer;
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenOffersTableAction({
  offer,
  token,
  tokenMarketData,
}: TokenOffersTableActionProps) {
  const { address } = useAccount();

  if (!address) {
    return (
      <ConnectWalletModal>
        <Button size="md">Connect wallet</Button>
      </ConnectWalletModal>
    );
  }

  const isOwner =
    validateAndParseAddress(address) ===
    validateAndParseAddress(tokenMarketData.owner);
  const isOfferer =
    validateAndParseAddress(address) === validateAndParseAddress(offer.source);

  if (isOwner) {
    return (
      <AcceptOffer
        offer={offer}
        token={token}
        tokenMarketData={tokenMarketData}
      />
    );
  }

  if (isOfferer) return <CancelOffer offer={offer} token={token} />;

  return null;
}
