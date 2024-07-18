import type { Collection } from "~/types";
import { env } from "~/env";

interface GetCollectionParams {
  collectionAddress: string;
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
    console.log("Failed to fetch collection");
    return null;
  }

  const collection = (await response.json()) as Collection;

  return collection;
}
