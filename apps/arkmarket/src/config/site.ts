import { env } from "~/env";

export const siteConfig =
  env.NEXT_PUBLIC_THEME === "default"
    ? {
        name: "ArkMarket",
        url: "https://market.arkproject.dev",
        ogImage: "",
        description:
          "Clean and simple ArkProject marketplace starter repo using Turbo repo.",
        links: {
          twitter: "https://twitter.com/ArkProjectNFTs",
          discord: "https://discord.gg/4sX8ZEUPUW",
          github: "https://github.com/ArkProjectNFTs/ark-market",
          telegram: "https://t.me/arkprojectnfts",
        },
      }
    : {
        name: "Unframed",
        url: "https://market.arkproject.dev",
        ogImage: "",
        description:
          "Clean and simple ArkProject marketplace starter repo using Turbo repo.",
        links: {
          twitter: "https://x.com/unframedco",
        },
      };

export type SiteConfig = typeof siteConfig;
