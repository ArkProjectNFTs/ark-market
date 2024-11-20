"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { shortAddress, timeSinceShort } from "@ark-market/ui";
import { ShoppingCart, VerifiedIcon } from "@ark-market/ui/icons";
import { Marquee } from "@ark-market/ui/marquee";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import Media from "~/components/media";
import getHomepageLatestSales from "~/lib/getHomepageLatestSales";

export default function LatestSales() {
  const { data } = useQuery({
    queryKey: ["home-page-latest-sales"],
    queryFn: () => getHomepageLatestSales(),
    refetchInterval: 10_000,
  });

  if (data === undefined || data.data.length === 0) {
    return null;
  }

  return (
    <section>
      <div className="relative w-full overflow-hidden">
        <Marquee className="font-display text-5xl font-bold leading-[3.3rem] tracking-normal [--duration:20s] sm:text-[5rem] sm:leading-[5rem] md:text-[7.5rem] md:leading-[7.5rem] lg:text-[12.15rem] lg:leading-[12.15rem]">
          <p className="whitespace-nowrap">Latest sales</p>
          <p
            className="whitespace-nowrap text-transparent dark:hidden"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "black",
            }}
          >
            Latest sales
          </p>
          <p
            className="hidden whitespace-nowrap text-transparent dark:block"
            style={{
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "1px",
              WebkitTextStrokeColor: "white",
            }}
          >
            Latest sales
          </p>
        </Marquee>
      </div>

      <div className="mt-4 h-[34rem] overflow-auto rounded-[32px] border border-foreground md:mt-12">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-background">
              <TableHead>
                <p className="pl-3">Event</p>
              </TableHead>
              <TableHead>
                <p className="py-3">Token</p>
              </TableHead>
              <TableHead>
                <p className="py-3">Price</p>
              </TableHead>
              <TableHead>
                <p className="py-3">From</p>
              </TableHead>
              <TableHead>
                <p className="py-3">To</p>
              </TableHead>
              <TableHead>
                <p className="py-3">Date</p>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm font-semibold">
            {data.data.map((sale) => {
              return (
                <TableRow
                  key={`ls-${sale.transaction_hash}`}
                  className="group h-[5.75rem] text-muted-foreground"
                >
                  <TableCell className="text-foreground transition-colors group-hover:text-muted-foreground">
                    <div className="flex items-center gap-4 pl-3">
                      <ShoppingCart /> Sale
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex min-w-44 items-center gap-4">
                      <Media
                        className="size-14 rounded-xs object-contain"
                        alt={sale.metadata?.name ?? "Unknown"}
                        src={sale.metadata?.image}
                        mediaKey={sale.metadata?.image_key}
                        height={112}
                        width={112}
                      />
                      <div className="overflow-hidden whitespace-nowrap">
                        <Link
                          href={`/token/${sale.collection_address}/${sale.token_id}`}
                          className="flex items-center gap-1 transition-colors hover:text-primary"
                        >
                          <p className="overflow-hidden text-ellipsis text-base font-medium text-foreground">
                            {sale.metadata?.name ?? "Unknown"}
                          </p>
                        </Link>
                        <Link
                          href={`/collection/${sale.collection_address}`}
                          className="flex items-center gap-1 transition-colors hover:text-primary"
                        >
                          {sale.collection_name}
                          <VerifiedIcon className="text-primary" />
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    <PriceTag price={sale.price} currency={sale.currency} />
                  </TableCell>
                  <TableCell className="text-primary">
                    <Link href={`/wallet/${sale.from}`}>
                      {shortAddress(sale.from)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-primary">
                    <Link href={`/wallet/${sale.to}`}>
                      {shortAddress(sale.to)}
                    </Link>
                  </TableCell>
                  <TableCell className="text-foreground transition-colors group-hover:text-muted-foreground">
                    {timeSinceShort(sale.timestamp)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
