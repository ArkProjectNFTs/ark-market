import type {
  CollectionApiResponse,
  CollectionTokenActivityApiResponse,
  CollectionTokenApiResponse,
  CollectionTokenOffersApiResponse,
  TokenMarketData,
} from "~/types";
import { env } from "~/env";

export async function getCollectionToken(
  contract_address: string,
  token_id: string,
) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/tokens/${contract_address}/${token_id}`,
    {
      headers: {
        "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const { result } = (await response.json()) as CollectionTokenApiResponse;

  return result;
}

export async function getOrderbookCollectionToken({
  contract_address,
  token_id,
}: {
  contract_address: string;
  token_id: string;
}) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_ORDERBOOK_API_URL}/token/${contract_address}/${token_id}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as TokenMarketData;

  return data;
}

export async function getCollectionTokenOffers({
  contract_address,
  token_id,
}: {
  contract_address: string;
  token_id: string;
}) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_ORDERBOOK_API_URL}/token/${contract_address}/${token_id}/offers`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = (await response.json()) as CollectionTokenOffersApiResponse;

  return data;
}

export async function getCollection(contract_address: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/contracts/${contract_address}`,
    {
      headers: {
        "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch collection");
  }

  const { result } = (await response.json()) as CollectionApiResponse;

  return result;
}

export async function getTokenActivity({
  contract_address,
  token_id,
}: {
  contract_address: string;
  token_id: string;
}) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_ORDERBOOK_API_URL}/token/${contract_address}/${token_id}/history`,
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as CollectionTokenActivityApiResponse;

  return data;
}
