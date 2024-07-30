import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import { homepageConfig } from "~/config/homepage";

export default function LatestSales() {
  if (homepageConfig.latestSales.length === 0) {
    return null;
  }
  return (
    <section>
      <h2 className="text-3xl font-semibold">Latest sale</h2>
      <Table className="mt-12">
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead>
              <p className="pl-3">Event</p>
            </TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-semibold">
          {homepageConfig.latestSales.map((sale, index) => {
            // TOOD @YohanTz: Proper key when real data
            return (
              <TableRow
                key={index}
                className="group h-[5.75rem] text-muted-foreground"
              >
                <TableCell className="text-white transition-colors group-hover:text-muted-foreground">
                  <div className="flex items-center gap-4 pl-3">
                    <ShoppingCart /> Sale
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="size-14 rounded-xs bg-secondary" />
                    <div>
                      <p className="text-base font-medium text-white">
                        {sale.token.name}
                      </p>
                      <Link
                        href={`/collection/${sale.token.collection_address}`}
                      >
                        {sale.token.collection_name}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-white">
                  <PriceTag price={sale.price} />
                </TableCell>
                <TableCell>{sale.from}</TableCell>
                <TableCell>{sale.to}</TableCell>
                <TableCell className="text-white transition-colors group-hover:text-muted-foreground">
                  1min ago
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}
