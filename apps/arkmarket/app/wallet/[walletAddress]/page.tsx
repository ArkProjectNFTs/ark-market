import Portfolio from "./components/portfolio";
import PortfolioHeader from "./components/portfolio-header";
import { getWalletCollections, getWalletTokens } from "./queries/getWalletData";

interface WalletPageProps {
  params: {
    walletAddress: string;
  };
}

// TODO: Fetch starknet-id name on the server
export default async function WalletPage({ params }: WalletPageProps) {
  const { walletAddress } = params;
  const walletTokensInitialData = await getWalletTokens({
    walletAddress,
  });
  // const walletCollectionsInitialData = await getWalletCollections({
  //   walletAddress,
  // });
  // console.log(walletCollectionsInitialData);

  if (
    walletTokensInitialData.data.length === 0
    // || walletCollectionsInitialData.data.length === 0
  ) {
    // TODO @YohanTz: Empty state
    return;
  }

  return (
    <main>
      <div className="sticky top-[var(--site-header-height)]">
        <PortfolioHeader walletAddress={walletAddress} />

        <Portfolio
          walletTokensInitialData={walletTokensInitialData}
          walletAddress={walletAddress}
        />
      </div>
    </main>
  );
}
