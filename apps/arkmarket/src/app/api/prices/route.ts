interface PriceEngineResponse {
  eth_usd: number;
  strk_usd: number;
}

export async function GET() {
  const response = await fetch("https://price-engine.arkproject.dev");

  if (!response.ok) {
    throw new Error("Failed to fetch price data");
  }

  const data = (await response.json()) as PriceEngineResponse;

  return Response.json({
    ethereum: { price: data.eth_usd },
    starknet: { price: data.strk_usd },
  });
}
