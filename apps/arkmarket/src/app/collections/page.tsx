import CollectionsContainer from "~/components/collections/collections-container";
import getCollections from "~/lib/getCollections";

export default async function CollectionsPage() {
  const collections = await getCollections({});

  return (
    <div className="">
      <div className="p-6 text-3xl font-extrabold md:text-5xl">
        All Collections
      </div>
      <CollectionsContainer initialData={collections} />
    </div>
  );
}
