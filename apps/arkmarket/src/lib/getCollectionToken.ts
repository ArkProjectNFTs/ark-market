import type { CollectionTokenApiResponse } from "~/types";
import { env } from "~/env";

export default async function getCollectionToken(
  contract_address: string,
  token_id: string,
) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/tokens/${contract_address}/${token_id}`,
    {
      headers: {
        "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const { result } = (await response.json()) as CollectionTokenApiResponse;

  return result;
}
