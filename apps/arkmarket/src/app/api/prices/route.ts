import { EvmChain } from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";

import { env } from "~/env";

void Moralis.start({
  apiKey: env.MORALIS_API_KEY,
});

export async function GET() {
  const response = await Moralis.EvmApi.token.getMultipleTokenPrices(
    {
      chain: EvmChain.ETHEREUM,
    },
    {
      tokens: [
        {
          tokenAddress: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        },
        {
          tokenAddress: "0xca14007eff0db1f8135f4c25b34de49ab0d42766",
        },
      ],
    },
  );
  const data = response.toJSON();

  return Response.json({
    ethereum: { price: data[0]?.usdPrice },
    starknet: { price: data[1]?.usdPrice },
  });
}
