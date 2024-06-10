import PortfolioHeader from "./components/portfolio-header";
import Portfolio from "./components/potfolio";
import { getWalletTokens } from "./queries/getWalletData";

interface WalletPageProps {
  params: {
    walletAddress: string;
  };
}

// TODO: Fetch starknet-id name on the server
export default async function WalletPage({ params }: WalletPageProps) {
  const { walletAddress } = params;
  // const walletTokensInitialData = await getWalletTokens({
  //   walletAddress,
  // });
  // if (walletTokensInitialData?.data.length === 0) {
  //   // TODO @YohanTz: Empty state
  //   return;
  // }

  return (
    <div>
      <div className="sticky top-[var(--site-header-height)]">
        <PortfolioHeader walletAddress={walletAddress} />

        {/* <Portfolio walletTokensInitialData={walletTokensInitialData} /> */}
        <Portfolio />
      </div>
    </div>
  );
}
