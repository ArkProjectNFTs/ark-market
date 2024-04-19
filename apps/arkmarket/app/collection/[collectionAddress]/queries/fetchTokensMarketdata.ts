import { validateAndParseAddress } from "starknet";

import { env } from "~/env";

export async function fetchTokensMarketdata(collectionAddress: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_ORDERBOOK_API_URL}/tokens/collection/${validateAndParseAddress(collectionAddress)}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
