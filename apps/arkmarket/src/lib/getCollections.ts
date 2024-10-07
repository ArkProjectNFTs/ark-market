import queryString from "query-string";

import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionStats,
  CollectionTimerange,
} from "~/types";
import { env } from "~/env";

interface GetCollectionsParams {
  page?: number;
  itemsPerPage?: number;
  sortBy?: CollectionSortBy;
  sortDirection?: CollectionSortDirection;
  timerange?: CollectionTimerange;
}

export interface CollectionsApiResponse {
  data: CollectionStats[];
  last_page: number;
}

export default async function getCollections({
  page,
  itemsPerPage = 50,
  sortBy = "volume",
  sortDirection = "desc",
  timerange = "10m",
}: GetCollectionsParams) {
  const params = queryString.stringify({
    page,
    items_per_page: itemsPerPage,
    sort: sortBy,
    direction: sortDirection,
    time_range: timerange,
  });

  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collections?${params}`,
  );

  if (!response.ok) {
    console.error("Failed to fetch collection data");
    return [];
  }

  const { data } = (await response.json()) as CollectionsApiResponse;

  return data;
}
