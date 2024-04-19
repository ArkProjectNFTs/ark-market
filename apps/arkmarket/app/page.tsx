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

export default async function HomePage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col space-y-4">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Link
                    href={`/collection/${"0x32d99485b22f2e58c8a0206d3b3bb259997ff0db70cffd25585d7dd9a5b0546"}`}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Everai</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>
                          Collection description
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
