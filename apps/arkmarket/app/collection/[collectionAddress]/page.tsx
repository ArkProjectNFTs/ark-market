import Collection from "./components/collection";
import { fetchCollection } from "./queries/fetchCollection";
import { fetchCollectionMarket } from "./queries/fetchCollectionMarket";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionAddress } = params;

  const initialCollectionData: unknown =
    await fetchCollection(collectionAddress);
  const initialCollectionMarketData: unknown =
    await fetchCollectionMarket(collectionAddress);

  return (
    <main className="container py-16">
      <Collection
        initialCollectionData={initialCollectionData}
        initialCollectionMarketData={initialCollectionMarketData}
        collectionAddress={collectionAddress}
      />
    </main>
  );
}
