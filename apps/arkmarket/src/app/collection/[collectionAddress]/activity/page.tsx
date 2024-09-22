import { notFound } from "next/navigation";

import getCollection from "~/lib/getCollection";
import CollectionActivityData from "../components/collection-activity-data";
import CollectionBanner from "../components/collection-banner";
import CollectionHeader from "../components/collection-header";
import CollectionNav from "../components/collection-nav";
import MobileCollectionHeader from "../components/mobile-collection-header";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionActivityPage({
  params,
}: CollectionPageProps) {
  const { collectionAddress } = params;
  const collection = await getCollection({ collectionAddress });

  if (!collection) {
    return notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--site-header-height))] flex-col">
      <CollectionBanner
        className="hidden md:block"
        collectionAddress={collectionAddress}
      />
      <CollectionHeader
        collectionAddress={collectionAddress}
        collection={collection}
      />
      <MobileCollectionHeader
        collectionAddress={collectionAddress}
        collection={collection}
      />
      <CollectionNav collectionAddress={collectionAddress} />
      <CollectionActivityData
        collectionAddress={collectionAddress}
        collectionTokenCount={collection.token_count}
      />
    </div>
  );
}
