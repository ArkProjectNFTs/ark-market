import { validateAndParseAddress } from "starknet";

import { env } from "~/env";

interface TokenParams {
  contractAddress: string;
  tokenId: string;
}

export default async function postTokenMetadataRefresh({
  contractAddress,
  tokenId,
}: TokenParams) {
  const validatedContractAddress = validateAndParseAddress(contractAddress);

  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/metadata/refresh`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contract_address: validatedContractAddress,
        token_id: tokenId,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to refresh metadata");
  }
}
