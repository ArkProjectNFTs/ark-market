import Portfolio from "./components/portfolio";
import PortfolioHeader from "./components/portfolio-header";
import { getWalletCollections, getWalletTokens } from "./queries/getWalletData";
import { walletPageSearchParamsCache } from "./search-params";

interface WalletPageProps {
  params: {
    walletAddress: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

// TODO: Fetch starknet-id name on the server
export default async function WalletPage({
  params,
  searchParams,
}: WalletPageProps) {
  const { walletAddress } = params;
  const { collection } = walletPageSearchParamsCache.parse(searchParams);
  const walletTokensInitialData = await getWalletTokens({
    walletAddress,
    collectionAddress: collection,
  });
  const walletCollectionsInitialData = await getWalletCollections({
    walletAddress,
  });

  if (walletTokensInitialData.data.length === 0) {
    // TODO @YohanTz: Empty state
    return;
  }
  console.log(walletCollectionsInitialData);

  return (
    <main>
      <div className="sticky top-[var(--site-header-height)]">
        <PortfolioHeader walletAddress={walletAddress} />

        <Portfolio
          walletTokensInitialData={walletTokensInitialData}
          walletCollectionsInitialData={walletCollectionsInitialData}
          walletAddress={walletAddress}
        />
      </div>
    </main>
  );
}
