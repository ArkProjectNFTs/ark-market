import type { Metadata } from "next";

import { env } from "~/env";
import Portfolio from "./components/portfolio";

const platform =
  env.NEXT_PUBLIC_THEME === "unframed" ? "Unframed" : "Ark Market";

export const metadata: Metadata = {
  title: `Porfolio | ${platform}`,
};

interface WalletPageProps {
  params: {
    walletAddress: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

// TODO: Fetch starknet-id name on the server
export default function WalletPage({
  params,
  // , searchParams
}: WalletPageProps) {
  const { walletAddress } = params;
  // const { collection } = walletPageSearchParamsCache.parse(searchParams);
  // const walletTokensInitialData = await getWalletTokens({
  //   walletAddress,
  //   collectionAddress: collection,
  // });
  // const walletCollectionsInitialData = await getWalletCollections({
  //   walletAddress,
  // });

  // if (walletTokensInitialData.data.length === 0) {
  //   // TODO @YohanTz: Empty state
  //   return;
  // }

  return (
    <Portfolio
      // walletTokensInitialData={walletTokensInitialData}
      // walletCollectionsInitialData={walletCollectionsInitialData}
      walletAddress={walletAddress}
    />
  );
}
