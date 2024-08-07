import type { AccountSearchResult, CollectionSearchResult } from "~/types";
import { env } from "~/env";

interface CollectionSearchApiResponse {
  data: {
    collections: CollectionSearchResult[];
    accounts: AccountSearchResult[];
  };
}

interface GetCollectionSearchParams {
  searchQuery: string;
}

export default async function getCollectionSearch({
  searchQuery,
}: GetCollectionSearchParams) {
  const queryParams = [`q=${searchQuery}`];

  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collections/search?${queryParams.join("&")}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    console.log("Failed to fetch perform collection search");
    return {
      data: { collections: [], accounts: [] },
    } as CollectionSearchApiResponse;
  }

  const collection = (await response.json()) as CollectionSearchApiResponse;

  return collection;
}
