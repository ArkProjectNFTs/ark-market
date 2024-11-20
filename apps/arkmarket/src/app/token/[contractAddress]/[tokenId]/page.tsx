"use server";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Token, TokenMarketData } from "~/types";
import { env } from "~/env";
import getToken from "~/lib/getToken";
import getTokenMarketData from "~/lib/getTokenMarketData";
import TokenAbout from "./components/token-about";
import TokenActions from "./components/token-actions";
import TokenActivity from "./components/token-activity";
import TokenOffers from "./components/token-offers";
import TokenStats from "./components/token-stats";
import TokenSummary from "./components/token-summary";
import TokenTraits from "./components/token-traits";

interface GenerateMetadataProps {
  params: { contractAddress: string; tokenId: string };
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { contractAddress, tokenId } = params;
  const token = await getToken({ contractAddress, tokenId });
  const platform =
    env.NEXT_PUBLIC_THEME === "unframed" ? "Unframed" : "Ark Market";
  const name =
    token.metadata?.name ?? `${token.collection_name} #${token.token_id}`;

  return {
    title: `${name} | ${platform}`,
    openGraph: {
      images: [
        `https://ark-market-unframed.vercel.app/api/og/token?collection_address=${contractAddress}&token_id=${tokenId}`,
      ],
    },
  };
}

interface TokenPageProps {
  params: {
    contractAddress: string;
    tokenId: string;
  };
}

export default async function TokenPage({
  params: { contractAddress, tokenId },
}: TokenPageProps) {
  let token: Token;
  let tokenMarketData: TokenMarketData;

  try {
    token = await getToken({
      contractAddress,
      tokenId,
    });

    tokenMarketData = await getTokenMarketData({
      contractAddress,
      tokenId,
    });
  } catch (error) {
    console.log(error);
    return notFound();
  }

  if (!token.owner) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-[120rem] p-5 pt-0 lg:p-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
        <TokenSummary
          className="top-[calc(var(--site-header-height)+2rem)] h-fit lg:sticky"
          token={token}
        />
        <div className="flex flex-col lg:gap-8">
          <div className="flex flex-col-reverse gap-5 lg:flex-col lg:gap-8">
            <TokenStats
              token={token}
              tokenMarketData={tokenMarketData}
              className="mb-5 lg:mb-0"
            />
            <TokenActions
              token={token}
              tokenMarketData={tokenMarketData}
              className="-mx-5 lg:mx-0"
            />
          </div>
          <TokenOffers
            token={token}
            tokenMarketData={tokenMarketData}
            className="-mx-5 lg:mx-0"
          />
          <TokenTraits
            className="-mx-5 lg:mx-0"
            contractAddress={contractAddress}
            tokenAttributes={token.metadata?.attributes ?? []}
          />
          <TokenAbout
            className="-mx-5 lg:mx-0"
            contractAddress={contractAddress}
            token={token}
            tokenId={tokenId}
          />
        </div>
      </div>
      <TokenActivity
        className="mt-6 lg:mt-20"
        contractAddress={contractAddress}
        tokenId={tokenId}
      />
    </main>
  );
}
