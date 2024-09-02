import { createSearchParamsCache, parseAsStringLiteral } from "nuqs/server";

import type { CollectionToken, Filters } from "~/types";
import { env } from "~/env";

export const itemsPerPage = 50;

export const collectionSortDirectionKey = "direction";
export const collectionSortDirectionsValues = ["asc", "desc"] as const;
export const collectionSortDirectionsParser = parseAsStringLiteral(
  collectionSortDirectionsValues,
).withDefault("asc");
export type CollectionSortDirection =
  (typeof collectionSortDirectionsValues)[number];

export const collectionSortByKey = "sort";
export const collectionSortByValues = ["price"] as const;
export const collectionSortByParser = parseAsStringLiteral(
  collectionSortByValues,
).withDefault("price");
export type CollectionSortBy = (typeof collectionSortByValues)[number];

export const collectionPageSearchParamsCache = createSearchParamsCache({
  [collectionSortDirectionKey]: collectionSortDirectionsParser,
  [collectionSortByKey]: collectionSortByParser,
});

export interface CollectionTokensApiResponse {
  data: CollectionToken[];
  next_page: number | null;
  token_count: number;
}

interface GetCollectionTokensParams {
  collectionAddress: string;
  page?: number;
  sortDirection: CollectionSortDirection;
  sortBy: CollectionSortBy;
  filters: Filters;
}

export async function getCollectionTokens({
  collectionAddress,
  page,
  sortDirection,
  sortBy,
  filters,
}: GetCollectionTokensParams) {
  const queryParams = [
    `items_per_page=${itemsPerPage}`,
    `sort=${sortBy}`,
    `direction=${sortDirection}`,
    `filters=${encodeURIComponent(JSON.stringify(filters))}`,
  ];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  console.log(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collections/${collectionAddress}/0x534e5f4d41494e/tokens?${queryParams.join("&")}`,
  );

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collections/${collectionAddress}/0x534e5f4d41494e/tokens?${queryParams.join("&")}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(url, response.status);

    return {
      data: [],
      next_page: null,
      token_count: 0,
    };
  }

  const result = (await response.json()) as CollectionTokensApiResponse;

  return result;
}
