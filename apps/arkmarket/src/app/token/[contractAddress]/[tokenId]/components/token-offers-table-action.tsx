import { useAccount } from "@starknet-react/core";
import { validateAndParseAddress } from "starknet";

import { Button } from "@ark-market/ui/button";

import AcceptOffer from "~/app/assets/[contract_address]/[token_id]/components/accept-offer";
import CancelOffer from "~/app/assets/[contract_address]/[token_id]/components/cancel-offer";
import ConnectWalletModal from "~/components/connect-wallet-modal";

interface TokenOffersTableActionProps {
  owner: string | null;
  offerSourceAddress: string | null;
  offerOrderHash: string;
  tokenId: string;
  tokenContractAddress: string;
}

export default function TokenOffersTableAction({
  owner,
  offerSourceAddress,
  offerOrderHash,
  tokenId,
  tokenContractAddress,
}: TokenOffersTableActionProps) {
  const { address } = useAccount();

  const isOwner =
    address !== undefined &&
    validateAndParseAddress(address) === validateAndParseAddress(owner ?? "");

  if (!address) {
    return (
      <ConnectWalletModal>
        <Button size="xl">Connect wallet</Button>
      </ConnectWalletModal>
    );
  }

  if (isOwner) {
    return <AcceptOffer />;
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
