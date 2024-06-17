import { env } from "~/env";

const itemsPerPage = 50;

export interface Metadata {
  image: string;
  name: string;
}
export interface WalletToken {
  best_offer: number | null;
  contract: string;
  floor: number | null;
  list_price: number | null;
  owner: string;
  received_at: null | string;
  token_id: string;
  metadata: Metadata | null;
}
export interface WalletTokensApiResponse {
  data: WalletToken[];
  next_page: number | null;
  token_count: number;
}
interface GetWalletTokensParams {
  page?: number;
  walletAddress: string;
  collectionAddress?: string | null;
}
export async function getWalletTokens({
  page,
  walletAddress,
  collectionAddress,
}: GetWalletTokensParams) {
  const queryParams = [`items_per_page=${itemsPerPage}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }
  if (collectionAddress) {
    queryParams.push(`collection=${collectionAddress}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/portfolio/${walletAddress}?${queryParams.join("&")}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(url, response.status);
    return {
      data: [],
      next_page: null,
      token_count: 0,
    } as WalletTokensApiResponse;
  }

  return response.json() as Promise<WalletTokensApiResponse>;
}

export interface WalletCollection {
  address: string;
  image: string | null;
  collection_name: string;
  floor: number;
  user_listed_tokens: number;
  user_token_count: number;
}
export interface WalletCollectionsApiResponse {
  data: WalletCollection[];
  next_page: number | null;
  collection_count: number;
  token_count: number;
}
interface GetWalletCollectionsParams {
  page?: number;
  walletAddress: string;
}
export async function getWalletCollections({
  page,
  walletAddress,
}: GetWalletCollectionsParams) {
  const queryParams = [`items_per_page=${itemsPerPage}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/portfolio/${walletAddress}/collections?${queryParams.join("&")}`;
  console.log(url);

  const response = await fetch(url);
  if (!response.ok) {
    console.error(url, response.status);
    return {
      data: [],
      next_page: null,
      collection_count: 0,
      token_count: 0,
    } as WalletCollectionsApiResponse;
  }

  // return response.json() as Promise<WalletCollectionsApiResponse>;
  return response.json() as Promise<WalletCollectionsApiResponse>;
}
