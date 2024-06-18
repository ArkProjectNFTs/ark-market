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
        <div className="grid grid-cols-4 gap-4">
          {collections.map((collection, index) => (
            <Link href={`/collection/${collection.address}`} key={index}>
              <Card className="overflow-hidden">
                <CardContent
                  className="relative w-full"
                  style={{ paddingBottom: "100%" }}
                >
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    layout="fill"
                    objectFit="cover"
                    className="absolute left-0 top-0 h-full w-full"
                  />
                </CardContent>
                <CardFooter className="flex flex-col items-start p-4">
                  <div className="mb-2 font-bold">{collection.name}</div>
                  <div className="flex w-full justify-between">
                    <div>
                      <div className="text-xs">Floor</div>
                      <div className="text-sm font-bold">2 ETH</div>
                    </div>
                    <div className="min-w-20">
                      <div className="text-xs">Volume</div>
                      <div className="text-sm font-bold">10 ETH</div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
