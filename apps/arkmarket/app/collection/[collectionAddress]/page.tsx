import { notFound } from "next/navigation";

import { siteHeaderRemHeight } from "~/components/site-header";
import CollectionBanner from "./components/collection-banner";
import CollectionFooter from "./components/collection-footer";
import CollectionHeader from "./components/collection-header";
import CollectionItemsActivity from "./components/collection-items-activity";
import { getCollectionTokens } from "./queries/getCollectionData";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionAddress } = params;
  // TODO: fetch collection infos
  const collectionTokensInitialData = await getCollectionTokens({
    collectionAddress,
  });
  // TODO: Implement properly
  if (collectionTokensInitialData === undefined) {
    notFound();
  }

  return (
    <main>
      <CollectionBanner />

      <CollectionHeader
        className="sticky z-20"
        style={{ top: `${siteHeaderRemHeight}rem` }}
      />

      <CollectionItemsActivity
        collectionAddress={collectionAddress}
        collectionTokensInitialData={collectionTokensInitialData}
      />
      <CollectionFooter className="sticky bottom-0 z-10" />
    </main>
  );
}
