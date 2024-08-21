import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn, focusableStyles } from "@ark-market/ui";
import { Typography } from "@ark-market/ui/typography";

import { homepageConfig } from "~/config/homepage";

export default function ExploreCategory() {
  if (homepageConfig.exploreCategory.length === 0) {
    return null;
  }

  return (
    <section>
      <Typography variant="h2" asChild>
        <h2>Explore Category</h2>
      </Typography>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 md:gap-y-8 xl:grid-cols-3">
        {homepageConfig.exploreCategory.map((category) => {
          return (
            <Link
              key={category.name}
              className={cn(
                "group flex items-center justify-between rounded-lg bg-card py-3.5 pl-3.5 pr-7",
                focusableStyles,
              )}
              href="/"
            >
              <div className="flex items-center gap-6">
                <div className="size-16 overflow-hidden rounded-md">
                  <Image
                    src={category.image}
                    height={64}
                    width={64}
                    alt={category.name}
                    className="transition-transform group-hover:scale-110"
                  />
                </div>
                <h4 className="text-xl font-semibold">{category.name}</h4>
              </div>
              <div className="flex size-10 items-center justify-center rounded-xs border border-border transition-[border] group-hover:border-white">
                <ArrowUpRight className="size-5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
