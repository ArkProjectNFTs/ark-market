import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ark-market/ui/components/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ark-market/ui/components/carousel";

import { collections } from "~/config/homepage"; // Update with the correct path to your JSON file

export default function HomePage() {
  return (
    <main className="container py-12">
      <div className="relative mb-10 w-auto overflow-hidden rounded-md">
        <Link
          href={`/collection/${"0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478"}`}
        >
          <Image
            src="/temp/everai_banner.png"
            alt="everai"
            width="3024"
            height="532"
          />
        </Link>
      </div>
      <div className="flex flex-col space-y-4">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {collections.map((collection, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Link href={`/collection/${collection.address}`}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{collection.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          <Image
                            src={collection.image}
                            alt={collection.name}
                            width={300}
                            height={300}
                            objectFit="cover"
                          />
                        </CardDescription>
                      </CardContent>
                      <CardFooter>Floor price 0.2 eth</CardFooter>
                    </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </main>
  );
}
