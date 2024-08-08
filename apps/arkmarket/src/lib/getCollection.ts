import type { Collection } from "~/types";
import { env } from "~/env";

interface GetCollectionParams {
  collectionAddress: string;
}

export interface CollectionApiResponse {
  data: Collection;
}

export default async function getCollection({
  collectionAddress,
}: GetCollectionParams) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collections/${collectionAddress}/0x534e5f4d41494e`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch collection data");
  }

  const collection = (await response.json()) as CollectionApiResponse;

  return collection;
}
