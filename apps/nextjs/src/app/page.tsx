import Collection from "./collection/[collectionAddress]/components/collection";
import { fetchCollection } from "./collection/[collectionAddress]/queries/fetchCollection";
import { fetchCollectionMarket } from "./collection/[collectionAddress]/queries/fetchCollectionMarket";

export default async function HomePage() {
  const initialCollectionData: unknown = await fetchCollection(
    "0x32d99485b22f2e58c8a0206d3b3bb259997ff0db70cffd25585d7dd9a5b0546",
  );
  const initialCollectionMarketData: unknown = await fetchCollectionMarket(
    "0x32d99485b22f2e58c8a0206d3b3bb259997ff0db70cffd25585d7dd9a5b0546",
  );

  return (
    <main className="container py-16">
      <Collection
        initialCollectionData={initialCollectionData}
        initialCollectionMarketData={initialCollectionMarketData}
        collectionAddress="0x32d99485b22f2e58c8a0206d3b3bb259997ff0db70cffd25585d7dd9a5b0546"
      />
    </main>
  );
}
