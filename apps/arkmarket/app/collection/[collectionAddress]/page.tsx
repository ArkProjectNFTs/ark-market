import { siteHeaderRemHeight } from "~/components/site-header";
import CollectionBanner from "./components/collection-banner";
import CollectionFooter from "./components/collection-footer";
import CollectionHeader from "./components/collection-header";
import CollectionItemsActivity from "./components/collection-items-activity";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionAddress } = params;

  return (
    <main>
      <CollectionBanner />

      <CollectionHeader
        className="sticky z-10"
        style={{ top: `${siteHeaderRemHeight}rem` }}
      />

      <CollectionItemsActivity />
      <CollectionFooter className="sticky bottom-0" />
    </main>
  );
}
