import { formatUnits } from "@ark-market/ui/lib/utils";

const traitsData = [
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
  { trait: "Armor color", name: "Son Of The Sky", price: 768000000000000000n },
];

export default function TokenTraits() {
  return (
    <div className="rounded-lg border border-border p-6">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-semibold">Traits</h2>
        <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm text-secondary-foreground">
          {traitsData.length}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-[repeat(auto-fill,_minmax(12rem,1fr))] gap-2">
        {traitsData.map((data, index) => {
          return (
            <div className="rounded-lg bg-card p-3.5" key={index}>
              <p className="text-sm font-medium text-muted-foreground">
                {data.trait}
              </p>
              <p className="text-lg font-semibold">{data.name}</p>
              <p className="mt-2 text-sm font-medium">
                {formatUnits(data.price, 18)}{" "}
                <span className="text-muted-foreground">ETH</span>
              </p>
            </div>
          );
        })}
        <></>
      </div>
    </div>
  );
}
