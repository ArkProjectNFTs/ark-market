import { notFound } from "next/navigation";

import MobileTokenActivity from "./components/mobile-token-activity";
import TokenAbout from "./components/token-about";
import TokenActions from "./components/token-actions";
import TokenActivity from "./components/token-activity";
import TokenOffers from "./components/token-offers";
import TokenStats from "./components/token-stats";
import TokenSummary from "./components/token-summary";
import TokenTraits from "./components/token-traits";
import { getTokenInfos } from "./queries/getTokenData";

interface TokenPageProps {
  params: {
    contractAddress: string;
    tokenId: string;
  };
}

export default async function TokenPage({
  params: { contractAddress, tokenId },
}: TokenPageProps) {
  const tokenInfosInitialData = await getTokenInfos({
    contractAddress,
    tokenId,
  });
  if (tokenInfosInitialData === undefined) {
    notFound();
  }

  return (
    <main className="m-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <TokenSummary
          className="top-[calc(var(--site-header-height)+2rem)] h-fit lg:sticky"
          contractAddress={contractAddress}
          tokenInfos={tokenInfosInitialData.data}
          tokenId={tokenId}
        />

        <div className="flex flex-col lg:gap-8">
          <div className="flex flex-col-reverse gap-8 lg:flex-col">
            <TokenStats
              tokenInfos={tokenInfosInitialData.data}
              className="mb-8 lg:mb-0"
            />
            <TokenActions tokenInfos={tokenInfosInitialData.data} />
          </div>
          <TokenOffers className="-mx-8 lg:mx-0" />
          <TokenTraits
            className="-mx-8 lg:mx-0"
            tokenAttributes={
              tokenInfosInitialData.data.metadata?.attributes ?? []
            }
          />
          <TokenAbout
            className="-mx-8 lg:mx-0"
            contractAddress={contractAddress}
            tokenInfos={tokenInfosInitialData.data}
            tokenId={tokenId}
          />
        </div>
      </div>

      <TokenActivity className="mt-20 hidden lg:block" />
      <MobileTokenActivity className="mt-8 lg:hidden" />
    </main>
  );
}
