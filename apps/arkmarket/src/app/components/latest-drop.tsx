import Image from "next/image";
import Link from "next/link";

import { cn, ellipsableStyles, focusableStyles } from "@ark-market/ui";
import { Card, CardContent, CardFooter } from "@ark-market/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@ark-market/ui/carousel";
import VerifiedIcon from "@ark-market/ui/icons/verified-icon";

import { homepageConfig } from "~/config/homepage";

export default function LatestDrop() {
  if (homepageConfig.latestDropCollections.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold">Latest drop</h2>
      <Carousel className="mt-8">
        <CarouselContent>
          {homepageConfig.latestDropCollections.map((collection, index) => {
            return (
              <CarouselItem
                key={index}
                className="basis-[calc(100%-4rem)] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
              >
                <Link
                  href={`/collection/${collection.address}`}
                  key={index}
                  className={focusableStyles}
                >
                  <Card className="overflow-hidden border-none">
                    <CardContent className="p-0">
                      {collection.image ? (
                        <Image
                          src={collection.image}
                          height={500}
                          width={500}
                          alt={collection.name}
                          className="aspect-square w-full object-cover"
                        />
                      ) : (
                        <div className="aspect-square bg-secondary" />
                      )}
                    </CardContent>
                    <CardFooter className="flex flex-col items-start p-5">
                      <div className="flex w-full items-center gap-1.5">
                        <h4
                          className={cn(
                            "text-xl font-semibold",
                            ellipsableStyles,
                          )}
                        >
                          {collection.name}
                        </h4>
                        <VerifiedIcon className="text-background" />
                      </div>
                      <span className="mt-5 text-sm font-medium text-muted-foreground">
                        Status
                      </span>
                      <p className="font-medium">Mint starts in 2 hours</p>
                    </CardFooter>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
