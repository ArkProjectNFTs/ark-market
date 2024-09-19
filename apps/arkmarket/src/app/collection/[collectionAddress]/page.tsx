import { notFound } from "next/navigation";

import CollectionBanner from "~/components/collection/collection-banner";
import CollectionHeader from "~/components/collection/collection-header";
import CollectionItems from "~/components/collection/collection-items";
import MobileCollectionHeader from "~/components/collection/mobile-collection-header";
import getCollection from "~/lib/getCollection";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionAddress } = params;
  const collection = await getCollection({ collectionAddress });

  if (!collection?.name) {
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
      <CollectionItems
        collectionAddress={collectionAddress}
        collectionTokenCount={collection.token_count}
      />
    </div>
  );
}
