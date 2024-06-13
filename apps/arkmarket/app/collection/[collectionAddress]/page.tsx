import { notFound } from "next/navigation";

import { collectionPageSearchParamsCache } from "../search-params";
import CollectionBanner from "./components/collection-banner";
import CollectionFooter from "./components/collection-footer";
import CollectionHeader from "./components/collection-header";
import CollectionItemsActivity from "./components/collection-items-activity";
import MobileCollectionHeader from "./components/mobile-collection-header";
import {
  getCollectionInfos,
  getCollectionTokens,
} from "./queries/getCollectionData";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { collectionAddress } = params;
  const { direction, sort } =
    collectionPageSearchParamsCache.parse(searchParams);
  const collectionInfos = await getCollectionInfos({
    collectionAddress,
  });

  const collectionTokensInitialData = await getCollectionTokens({
    collectionAddress,
    sortDirection: direction,
    sortBy: sort,
  });

  if (
    collectionTokensInitialData.data.length === 0 ||
    collectionInfos === undefined
  ) {
    notFound();
  }

  return (
    <main>
      <CollectionBanner
        className="hidden md:block"
        collectionAddress={collectionAddress}
      />

      <CollectionHeader
        className="sticky top-[var(--site-header-height)] z-20 hidden md:block"
        collectionInfos={collectionInfos}
      />
      <MobileCollectionHeader
        className="md:hidden"
        collectionInfos={collectionInfos}
      />

      <CollectionItemsActivity
        collectionAddress={collectionAddress}
        collectionTokensInitialData={collectionTokensInitialData}
      />
      <CollectionFooter className="sticky bottom-0 z-10 hidden md:flex" />
    </main>
  );
}
