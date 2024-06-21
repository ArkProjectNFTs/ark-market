import TokenAboutCollection from "./components/token-about-collection";
import TokenActions from "./components/token-actions";
import TokenActivity from "./components/token-activity";
import TokenOffers from "./components/token-offers";
import TokenStats from "./components/token-stats";
import TokenSummary from "./components/token-summary";
import TokenTraits from "./components/token-traits";

interface TokenPageProps {
  params: {
    contractAddress: string;
    tokenId: string;
  };
}

export default function TokenPage({
  params: { contractAddress, tokenId },
}: TokenPageProps) {
  return (
    <main className="m-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <TokenSummary
          className="top-[calc(var(--site-header-height)+2rem)] h-fit lg:sticky"
          contractAddress={contractAddress}
        />

        <div className="flex flex-col gap-8">
          <TokenStats className="hidden lg:flex" />
          <TokenActions />
          <TokenOffers />
          <TokenTraits />
          <TokenAboutCollection />
        </div>
      </div>

      <TokenActivity className="mt-20" />
    </main>
  );
}
