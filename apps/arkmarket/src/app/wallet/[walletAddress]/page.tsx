import Portfolio from "~/components/wallet/portfolio";

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
