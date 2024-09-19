import { validateAndParseAddress } from "starknet";

import { shortAddress } from "@ark-market/ui";

interface OwnerOrShortAddressParams {
  ownerAddress: string;
  address?: string;
}

export default function ownerOrShortAddress({
  ownerAddress,
  address,
}: OwnerOrShortAddressParams) {
  const validatedOwnerAddress = validateAndParseAddress(ownerAddress);

  if (!address) {
    return shortAddress(validatedOwnerAddress);
  }

  const validatedAddress = validateAndParseAddress(address);

  return validatedAddress === validatedOwnerAddress
    ? "You"
    : shortAddress(validatedOwnerAddress);
}
