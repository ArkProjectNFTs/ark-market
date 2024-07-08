import { env } from "~/env";

interface TokenMetadataAttribute {
  display_type: string | null;
  trait_type: string | null;
  value: string | null;
}

export interface TokenMetadata {
  image: string;
  name: string;
  animation_key: string | null;
  animation_url: string | null;
  image_key: string | null;
  attributes: TokenMetadataAttribute[];
}
export interface TokenInfosApiResponse {
  data: {
    collection_name: string;
    last_price: string | null;
    metadata: TokenMetadata | null;
    owner: string;
    price: string | null;
    top_offer: string | null;
  };
}
interface GetTokenInfosParams {
  contractAddress: string;
  tokenId: string;
}
export async function getTokenInfos({
  contractAddress,
  tokenId,
}: GetTokenInfosParams) {
  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(url, response.status);
    return undefined;
  }

  return response.json() as Promise<TokenInfosApiResponse>;
}

export interface TokenOffer {
  expire_at: number;
  floor_difference: string | null;
  hash: string;
  offer_id: number;
  price: string;
  source: string | null;
}
interface TokenOffersApiResponse {
  data: TokenOffer[];
}
interface GetTokenOffersParams {
  contractAddress: string;
  page?: number;
  tokenId: string;
}
export async function getTokenOffers({
  contractAddress,
  page,
  tokenId,
}: GetTokenOffersParams) {
  const queryParams = [`items_per_page=${10}`];
  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId}/offers?${queryParams.join("&")}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(url, response.status);
    return undefined;
  }

  return (await response.json()) as Promise<TokenOffersApiResponse>;
}

export type TokenActivityType =
  | "LISTING"
  | "OFFER"
  | "CANCELLED"
  | "FULFILL"
  | "TRANSFER"
  | "EXECUTED"
  | "MINT";
export interface TokenActivity {
  activity_type: TokenActivityType;
  from: string | null;
  price: string | null;
  time_stamp: number;
  to: string | null;
  transaction_hash: string | null;
}
export interface TokenActivityApiResponse {
  data: TokenActivity[];
  count: number;
  next_page: number;
}
interface GetTokenActivityParams {
  contractAddress: string;
  page?: number;
  tokenId: string;
}
export async function getTokenActivity({
  contractAddress,
  page,
  tokenId,
}: GetTokenActivityParams) {
  const queryParams = [`items_per_page=${30}`];
  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/0x534e5f4d41494e/${tokenId}/activity?${queryParams.join("&")}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(url, response.status);
    return undefined;
  }

  return (await response.json()) as Promise<TokenActivityApiResponse>;
}
