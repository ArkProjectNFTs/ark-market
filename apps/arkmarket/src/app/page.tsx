import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ark-market/ui/components/card";

export default async function HomePage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col space-y-4">
        <h1>Homepage</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href={`/collection/${"0x32d99485b22f2e58c8a0206d3b3bb259997ff0db70cffd25585d7dd9a5b0546"}`}
          >
            <Card>
              <CardHeader>
                <CardTitle>Everai</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Collection description</CardDescription>
              </CardContent>
              <CardFooter>0.2 eth</CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  );
}
