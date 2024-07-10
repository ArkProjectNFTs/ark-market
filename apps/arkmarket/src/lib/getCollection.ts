import type { CollectionApiResponse } from "~/types";
import { env } from "~/env";

export default async function getCollection(contract_address: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/contracts/${contract_address}`,
    {
      headers: {
        "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch collection");
  }

  const { result } = (await response.json()) as CollectionApiResponse;

  return result;
}
