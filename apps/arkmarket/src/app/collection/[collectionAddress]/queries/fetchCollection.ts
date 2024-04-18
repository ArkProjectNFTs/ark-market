import { validateAndParseAddress } from "starknet";

import { env } from "~/env";

export const fetchCollection = async (collectionAddress: string) => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/tokens/${validateAndParseAddress(collectionAddress)}`,
    {
      headers: {
        "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
