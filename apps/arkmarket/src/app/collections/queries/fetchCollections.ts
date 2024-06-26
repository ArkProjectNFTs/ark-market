import { env } from "~/env";

export interface CollectionMetadata {
  name: string;
  contract_address: string;
  contract_type: string;
  image: string;
  symbol: string;
}

export interface CollectionMetadataResponse {
  result: CollectionMetadata[];
}

export async function fetchCollections() {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/contracts?limit=10`,
    {
      headers: {
        "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json() as Promise<CollectionMetadataResponse>;
}
