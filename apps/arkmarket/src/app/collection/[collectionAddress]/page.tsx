import { Badge } from "@ark-market/ui/badge";

import getCollection from "~/lib/getCollection";
import Collection from "./components/collection";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function CollectionPage({
  params,
  // searchParams,
}: CollectionPageProps) {
  const { collectionAddress } = params;
  // const { direction, sort } =
  //   collectionPageSearchParamsCache.parse(searchParams);
  const collectionInitialData = await getCollection({
    collectionAddress,
  });

  // const collectionTokensInitialData = await getCollectionTokens({
  //   collectionAddress,
  //   sortDirection: direction,
  //   sortBy: sort,
  // });

  // if (!collectionTokensInitialData.data.length) {
  //   // TODO @YohanTz: Handle case when a collection contract is deployed but no tokens in it
  //   notFound();
  // }

  return (
    <>
      <Badge>Hello</Badge>
      <div className="text-red-500">dawdWA</div>
      <Collection
        collectionAddress={collectionAddress}
        collectionInitialData={collectionInitialData}
        // collectionTokensInitialData={collectionTokensInitialData}
      />
    </>
  );
}
