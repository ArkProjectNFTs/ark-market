import type { Collection } from "~/types";
import { env } from "~/env";

interface GetCollectionParams {
  collectionAddress: string;
  chainId?: string;
}

export interface CollectionApiResponse {
  data: Collection;
}

const defaultChainId = "0x534e5f4d41494e";

export default async function getCollection({
  collectionAddress,
  chainId = defaultChainId,
}: GetCollectionParams) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collections/${collectionAddress}/${chainId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    console.error("Failed to fetch collection data");
    return null;
  }

  const { data } = (await response.json()) as CollectionApiResponse;

  return data;
}
