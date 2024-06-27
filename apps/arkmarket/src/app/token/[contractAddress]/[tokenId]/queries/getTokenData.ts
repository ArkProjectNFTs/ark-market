import { env } from "~/env";

// TODO @YohanTz: double check this type
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
    owner: string | null;
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
