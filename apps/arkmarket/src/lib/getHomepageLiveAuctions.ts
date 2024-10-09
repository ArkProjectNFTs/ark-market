import type { LiveAuctions } from "~/types";
import { env } from "~/env";

export interface LiveAuctionsApiResponse {
  data: LiveAuctions[];
}

export default async function getHomepageLiveAuctions() {
  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/live-auctions`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch live auctions");
  }

  const result = (await response.json()) as LiveAuctionsApiResponse;

  return result;
}
