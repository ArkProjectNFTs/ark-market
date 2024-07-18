import { validateAndParseAddress } from "starknet";

import { shortAddress } from "@ark-market/ui";

export default function ownerOrShortAddress(
  address?: string,
  ownerAddress?: string,
) {
  if (!address || !ownerAddress) {
    return;
  }

  const validatedAddress = validateAndParseAddress(address);
  const validatedOwnerAddress = validateAndParseAddress(ownerAddress);

  if (validatedAddress === validatedOwnerAddress) {
    return "You";
  }

  return shortAddress(validatedOwnerAddress);
}
