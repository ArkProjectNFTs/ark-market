import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { Button } from "@ark-market/ui/button";

import AcceptOffer from "~/app/assets/[contract_address]/[token_id]/components/accept-offer";
import CancelOffer from "~/app/assets/[contract_address]/[token_id]/components/cancel-offer";
import ConnectWalletModal from "~/components/connect-wallet-modal";

interface TokenOffersTableActionProps {
  owner: string;
  offerSourceAddress: string | null;
  offerOrderHash: string;
  tokenId: string;
  tokenContractAddress: string;
  offerAmount: string;
  tokenIsListed: boolean;
  tokenListingOrderHash: string | null;
}

export default function TokenOffersTableAction({
  offerAmount,
  offerOrderHash,
  offerSourceAddress,
  owner,
  tokenContractAddress,
  tokenId,
  tokenIsListed,
  tokenListingOrderHash,
}: TokenOffersTableActionProps) {
  const { address } = useAccount();

  const isOwner =
    address !== undefined &&
    validateAndParseAddress(address) === validateAndParseAddress(owner);

  if (!address) {
    return (
      <ConnectWalletModal>
        <Button size="md">Connect wallet</Button>
      </ConnectWalletModal>
    );
  }

  if (isOwner && tokenListingOrderHash !== null) {
    return (
      <AcceptOffer
        offerOrderHash={offerOrderHash}
        tokenId={tokenId}
        tokenContractAddress={tokenContractAddress}
        tokenOwner={owner}
        offerAmount={offerAmount}
        tokenIsListed={tokenIsListed}
        tokenListingOrderHash={tokenListingOrderHash}
      />
    );
  }

  if (
    validateAndParseAddress(address) ===
    validateAndParseAddress(offerSourceAddress ?? "")
  )
    return (
      <CancelOffer
        offerOrderHash={offerOrderHash}
        tokenId={tokenId}
        tokenContractAddress={tokenContractAddress}
      />
    );

  return null;
}
