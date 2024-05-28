import { env } from "~/env";

const itemsPerPage = 50;

export async function getCollectionInfos() {
  return null;
}

export interface CollectionToken {
  contract: string;
  token_id: string;
  owner: string;
  minted_at: number;
  updated_at: number;
}

export interface CollectionTokensApiResponse {
  data: CollectionToken[];
  next_page: number;
}

export async function getCollectionTokens({
  collectionAddress,
  page,
}: {
  collectionAddress: string;
  page?: number;
}) {
  const queryParams = [`items_per_page=${itemsPerPage}`];

  if (page !== undefined) {
    queryParams.push(`page=${page}`);
  }

  const url = `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collection/${collectionAddress}/tokens?${queryParams.join("&")}`;

  const response = await fetch(url);
  if (!response.ok) {
    return { data: [], next_page: 0 } as CollectionTokensApiResponse;
  }

  return response.json() as Promise<CollectionTokensApiResponse>;
}
