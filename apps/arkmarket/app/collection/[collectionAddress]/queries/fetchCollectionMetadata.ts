import { env } from "~/env";

export interface CollectionMetadata {
  name: string;
  contractAddress: string;
  contractType: string;
  image: string;
  symbol: string;
}

export interface CollectionMetadataResponse {
  result: CollectionMetadata;
}

export async function fetchCollectionMetadata(contract_address: string) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/contracts/${contract_address}`,
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
