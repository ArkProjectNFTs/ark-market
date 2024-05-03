import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/components/table";

import { fetchCollections } from "./queries/fetchCollections";

function getImageFromIPFS(image: string) {
  if (image.startsWith("ipfs://")) {
    const ipfsHash = image.slice(7);
    return `https://ipfs.arkproject.dev/ipfs/${ipfsHash}`;
  }
  return image;
}

export default async function CollectionsPage() {
  const initialCollections = await fetchCollections();

  return (
    <main className="container py-12">
      <h1>collections 2</h1>
      <div className="mx-auto w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Contract</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Symbol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialCollections.result.map((collection) => {
              const image = getImageFromIPFS(collection.image);
              return (
                <TableRow key={collection.contract_address}>
                  <TableCell>
                    <img
                      alt="Collection Image"
                      className="rounded-md"
                      height={50}
                      src={image ? image : "/missing.jpg"}
                      style={{
                        aspectRatio: "50/50",
                        objectFit: "cover",
                      }}
                      width={50}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {collection.name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {collection.contract_address}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {collection.contract_type}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {collection.symbol}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
