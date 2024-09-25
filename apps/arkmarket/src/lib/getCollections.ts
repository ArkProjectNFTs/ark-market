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
    itemsPerPage,
    sortBy,
    sortDirection,
    timerange,
  });

  // return [...Array(100).keys()].map((index) => ({
  //   address: `${index}x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478`,
  //   floor: parseEther("0.1"),
  //   floor_percentage: "10",
  //   image: "string",
  //   is_verified: true,
  //   top_offer: parseEther("0.1"),
  //   listed_items: 1244,
  //   listed_percentage: 23,
  //   marketcap: "123.45",
  //   name: `Collection ${index}`,
  //   owner_count: 0,
  //   sales: 0,
  //   token_count: 0,
  //   total_sales: 0,
  //   total_volume: "1123.4",
  //   volume: 0,
  // })) as CollectionStats[];

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
