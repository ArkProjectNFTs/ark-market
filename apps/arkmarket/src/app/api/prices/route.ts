import { Mobula } from "mobula-sdk";

import { env } from "~/env";

const mobula = new Mobula({
  apiKeyAuth: env.MOBULA_API_KEY,
});

export async function GET() {
  const response = await mobula.fetchMultipleAssetMarketData({
    assets: "ethereum,starknet",
  });

  if (response.errorResponse ?? !response.multiDataResponse?.data) {
    console.log("Error fetching prices", response.errorResponse);

    return Response.json({
      ethereum: { price: 0 },
      starknet: { price: 0 },
    });
  }

  return Response.json({
    ethereum: {
      price: response.multiDataResponse.data.ethereum?.price as number,
    },
    starknet: {
      price: response.multiDataResponse.data.starknet?.price as number,
    },
  });
}
