import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@ark-market/ui/button";

import { homepageConfig } from "~/config/homepage";

export default function ExploreCategory() {
  if (homepageConfig.exploreCategory.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold">Explore Category</h2>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 md:gap-y-8 xl:grid-cols-3">
        {homepageConfig.exploreCategory.map((category) => {
          return (
            <div
              key={category.name}
              className="flex items-center justify-between rounded-lg bg-card py-3.5 pl-3.5 pr-7"
            >
              <div className="flex items-center gap-6">
                <Image
                  src={category.image}
                  height={62}
                  width={62}
                  alt={category.name}
                  className="rounded-md"
                />
                <h4 className="text-xl font-semibold">{category.name}</h4>
              </div>
              <Button variant="outline" size="icon" asChild>
                <Link href="/">
                  <ArrowUpRight className="size-5" />
                </Link>
              </Button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
