import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import Media from "~/components/media";
import { getCollectionTokens } from "~/lib/getCollectionTokens";

interface ExploreCollectionImageProps {
  bannerImage?: string;
  collectionName: string;
  collectionAddress: string;
}

export default function ExploreCollectionImage({
  bannerImage,
  collectionAddress,
  collectionName,
}: ExploreCollectionImageProps) {
  const { data } = useQuery({
    queryKey: ["homepage-collection-token", collectionAddress],
    refetchInterval: 10_000,
    enabled: bannerImage === undefined,
    queryFn: () =>
      getCollectionTokens({
        collectionAddress,
      }),
  });

  if (bannerImage) {
    return (
      <div className="aspect-video w-full overflow-hidden">
        <Image
          src={bannerImage}
          className="aspect-video transition-transform group-hover:scale-110"
          alt={collectionName}
          height={512}
          width={932}
        />
      </div>
    );
  }
  const token = data?.data[0];
  console.log(token);

  return (
    <div className="aspect-video w-full overflow-hidden">
      <Media
        height={512}
        width={932}
        className="aspect-video object-cover transition-transform group-hover:scale-110"
        mediaKey={token?.metadata?.image_key}
        src={token?.metadata?.image}
        alt={collectionName}
      />
    </div>
  );
}
