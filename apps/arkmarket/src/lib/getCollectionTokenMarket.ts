import type { CollectionTokenMarketApiResponse } from "~/types";
import { env } from "~/env";

export default async function getCollectionTokenMarket(
  contract_address: string,
  token_id: string,
) {
  console.log(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contract_address}/0x534e5f4d41494e/${token_id}/marketdata`,
  );
  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contract_address}/0x534e5f4d41494e/${token_id}/marketdata`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const { data } = (await response.json()) as CollectionTokenMarketApiResponse;

  return data;
}
