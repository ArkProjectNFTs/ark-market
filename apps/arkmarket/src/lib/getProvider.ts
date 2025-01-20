import { alchemyProvider, publicProvider } from "@starknet-react/core";

import { env } from "~/env";

export default function getProvider() {
  if (env.NEXT_PUBLIC_NETWORK === "mainnet") {
    return alchemyProvider({
      apiKey: "ssydbI7745ocbNd_c-xULVsq9xXF947b",
    });
  } else {
    return publicProvider();
  }
}
