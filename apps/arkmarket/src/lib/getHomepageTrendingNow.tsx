import type { TrendingNow } from "~/types";
import { env } from "~/env";

export interface TrendingNowApiResponse {
  data: TrendingNow[];
}

export default async function getHomepageTrendingNow() {
  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/trending`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending now collections");
  }

  const result = (await response.json()) as TrendingNowApiResponse;

  return result;
}
