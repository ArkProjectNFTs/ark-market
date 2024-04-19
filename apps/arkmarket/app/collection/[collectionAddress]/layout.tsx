import "@ark-market/ui/globals.css";

import CollectionHeader from "./components/header";
import { fetchCollectionMetadata } from "./queries/fetchCollectionMetadata";

interface CollectionLayoutProps {
  children: React.ReactNode;
  params: { collectionAddress: string };
}

export default async function CollectionLayout({
  children,
  params,
}: CollectionLayoutProps) {
  const { collectionAddress } = params;
  const { result: collectionMetadata } =
    await fetchCollectionMetadata(collectionAddress);

  return (
    <div>
      <CollectionHeader collectionMetadata={collectionMetadata} />
      <div>{children}</div>
    </div>
  );
}
