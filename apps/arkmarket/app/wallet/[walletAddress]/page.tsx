import PortfolioHeader from "./components/portfolio-header";

interface WalletPageProps {
  params: {
    walletAddress: string;
  };
}

// TODO: Fetch starknet-id name on the server
export default function WalletPage({ params }: WalletPageProps) {
  const { walletAddress } = params;

  return (
    <div>
      <div className="sticky top-[var(--site-header-height)]">
        <PortfolioHeader walletAddress={walletAddress} />
      </div>
    </div>
  );
}
