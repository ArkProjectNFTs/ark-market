import { notFound } from "next/navigation";

import { siteHeaderRemHeight } from "~/components/site-header";
import { collectionPageSearchParamsCache } from "../search-params";
import CollectionBanner from "./components/collection-banner";
import CollectionFooter from "./components/collection-footer";
import CollectionHeader from "./components/collection-header";
import CollectionItemsActivity from "./components/collection-items-activity";
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
  // TODO: Implement properly
  if (
    collectionTokensInitialData.data.length === 0 ||
    collectionInfos === undefined
  ) {
    notFound();
  }

  return (
    <main>
      <CollectionBanner className="hidden lg:block" />

      <CollectionHeader
        className="sticky z-20"
        style={{ top: `${siteHeaderRemHeight}rem` }}
        collectionInfos={collectionInfos}
      />

      <CollectionItemsActivity
        collectionAddress={collectionAddress}
        collectionTokensInitialData={collectionTokensInitialData}
      />
      <CollectionFooter className="sticky bottom-0 z-10" />
    </main>
  );
}
