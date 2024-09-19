import { notFound } from "next/navigation";

import CollectionActivity from "~/components/collection/collection-activity";
import CollectionBanner from "~/components/collection/collection-banner";
import CollectionHeader from "~/components/collection/collection-header";
import CollectionNav from "~/components/collection/collection-nav";
import MobileCollectionHeader from "~/components/collection/mobile-collection-header";
import getCollection from "~/queries/getCollection";

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
      <CollectionActivity
        collectionAddress={collectionAddress}
        collectionTokenCount={collection.token_count}
      />
    </div>
  );
}
