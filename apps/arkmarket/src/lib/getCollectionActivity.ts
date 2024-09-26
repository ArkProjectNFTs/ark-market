import type { ActivityType, CollectionActivity } from "~/types";
import { env } from "~/env";

const itemsPerPage = 10;

export interface CollectionActivityApiResponse {
  count: number;
  data: CollectionActivity[];
  next_page: number;
}

interface GetCollectionActivityParams {
  page?: number;
  collectionAddress: string;
  activityFilters: ActivityType[];
}

export async function getCollectionActivity({
  page,
  collectionAddress,
  activityFilters,
}: GetCollectionActivityParams) {
  const queryParams = [`items_per_page=${itemsPerPage}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  if (activityFilters.length > 0) {
    activityFilters.map((filter) => {
      queryParams.push(`types[]=${filter}`);
    });
    // queryParams.push(`types[]=${activityFilters}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collections/${collectionAddress}/activity?${queryParams.join("&")}`;
  console.log(url);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch collection activity");
  }

  const result = (await response.json()) as CollectionActivityApiResponse;

  return result;
}
