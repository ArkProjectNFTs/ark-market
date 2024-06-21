import DiscordIcon from "@ark-market/ui/components/icons/discord-icon";
import WebsiteIcon from "@ark-market/ui/components/icons/website-icon";
import XIcon from "@ark-market/ui/components/icons/x-icon";

export default function TokenAboutCollection() {
  return (
    <div className="rounded-lg border border-border p-6">
      <h2 className="text-3xl font-semibold">{"About {collection_name}"}</h2>
      <div className="mt-8 flex items-center gap-6">
        <div className="size-28 flex-shrink-0 rounded-lg bg-secondary"></div>
        <p className="text-sm">
          {`Everai is a pioneering web3 brand set to expand its universe powered
          by the collective creativity of its artistic partners and vibrant
          community. In the Everai Universe, the Everais stand as the mightiest
          heroes of Shodai's civilization… Get yours now to join us in this
          collaborative journey to shape the Everai Universe!`}
        </p>
      </div>

      <div className="mt-10 flex items-center gap-4 text-muted-foreground">
        <XIcon className="size-4" />
        <DiscordIcon className="size-4" />
        <WebsiteIcon className="size-4" />
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="font-medium">Contract Address</p>
          <p className="text-muted-foreground">0x00...0000</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Token ID</p>
          <p className="text-muted-foreground">7078</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Token Standard</p>
          <p className="text-muted-foreground">ERC721</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Owner</p>
          <p className="text-muted-foreground">0x00...0000</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Royalty</p>
          <p className="text-muted-foreground">_%</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-medium">Chain</p>
          <p className="text-muted-foreground">Starknet</p>
        </div>
      </div>
    </div>
  );
}
