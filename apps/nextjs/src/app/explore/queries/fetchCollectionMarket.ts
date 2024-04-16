import { env } from "~/env";

export async function fetchCollectionMarket() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_ORDERBOOK_API_URL}/tokens/collection/0x32d99485b22f2e58c8a0206d3b3bb259997ff0db70cffd25585d7dd9a5b0546`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
