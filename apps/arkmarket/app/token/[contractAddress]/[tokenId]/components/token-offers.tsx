import { Meh } from "lucide-react";

export default function TokenOffers() {
  return (
    // TODO @YohanTz: max-height?
    <div className="rounded-lg border border-border px-6 pt-6">
      <h2 className="text-3xl font-semibold">Offers</h2>
      <div className="mb-8 mt-5 flex flex-col items-center text-muted-foreground">
        <Meh size={42} />
        <p className="mt-3 text-center text-xl font-semibold">
          No offers yet!
          <br />
          Make the first offers!
        </p>
      </div>
    </div>
  );
}
