import type { CollectionApiResponse } from "~/types";
import { env } from "~/env";

interface GetCollectionParams {
  contractAddress: string;
}

export default async function getCollection({
  contractAddress,
}: GetCollectionParams) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/contracts/${contractAddress}`,
    {
      headers: {
        "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    console.log("Failed to fetch collection");
    return null;
  }

  const { result } = (await response.json()) as CollectionApiResponse;

  return result;
}
