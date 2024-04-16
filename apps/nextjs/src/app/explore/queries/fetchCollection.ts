import { env } from "~/env";

export const fetchCollection = async () => {
  const response = await fetch(
    `${env.NEXT_PUBLIC_NFT_API_URL}/v1/tokens/0x32d99485b22f2e58c8a0206d3b3bb259997ff0db70cffd25585d7dd9a5b0546`,
    {
      headers: {
        "x-api-key": env.NEXT_PUBLIC_NFT_API_KEY,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
