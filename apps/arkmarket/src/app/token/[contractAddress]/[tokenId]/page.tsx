import { notFound } from "next/navigation";

import getCollection from "~/lib/getCollection";
import getCollectionToken from "~/lib/getCollectionToken";
import getCollectionTokenMarket from "~/lib/getCollectionTokenMarket";
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

  const collection = await getCollection(contractAddress);
  const token = await getCollectionToken(contractAddress, tokenId);
  const tokenMarketData = await getCollectionTokenMarket(
    contractAddress,
    tokenId,
  );

  return (
    <main className="mx-auto max-w-[120rem] p-5 pt-0 lg:p-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
        <TokenSummary
          className="top-[calc(var(--site-header-height)+2rem)] h-fit lg:sticky"
          contractAddress={contractAddress}
          tokenInfos={tokenInfosInitialData.data}
          tokenId={tokenId}
        />

        <div className="flex flex-col lg:gap-8">
          <div className="flex flex-col-reverse gap-5 lg:flex-col lg:gap-8">
            <TokenStats
              tokenInfos={tokenInfosInitialData.data}
              className="mb-5 lg:mb-0"
            />
            <TokenActions
              collection={collection}
              token={token}
              tokenMarketData={tokenMarketData}
              className="-mx-5 lg:mx-0"
            />
          </div>
          <TokenOffers
            className="-mx-5 lg:mx-0"
            contractAddress={contractAddress}
            tokenId={tokenId}
            tokenMarketData={tokenMarketData}
            owner={tokenInfosInitialData.data.owner}
          />
          <TokenTraits
            className="-mx-5 lg:mx-0"
            tokenAttributes={
              tokenInfosInitialData.data.metadata?.attributes ?? []
            }
          />
          <TokenAbout
            className="-mx-5 lg:mx-0"
            contractAddress={contractAddress}
            tokenInfos={tokenInfosInitialData.data}
            tokenId={tokenId}
          />
        </div>
      </div>
      <TokenActivity
        className="mt-20"
        contractAddress={contractAddress}
        tokenId={tokenId}
      />
    </main>
  );
}
