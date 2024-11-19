/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { CollectionToken, Token } from "~/types";
import { ETH } from "~/constants/tokens";
import BuyNowDialog from "../components/buy-now-dialog";

vi.mock("@ark-market/ui/button", () => ({
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

vi.mock("@ark-market/ui/dialog", () => ({
  Dialog: ({ children, open }: any) => (open ? <div>{children}</div> : null),
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <h2>{children}</h2>,
}));

vi.mock("@ark-market/ui/icons", () => ({
  LoaderCircle: () => <div>LoaderCircle</div>,
  NoListing: () => <div>NoListing</div>,
  Success: () => <div>Success</div>,
}));

vi.mock(
  "~/app/token/[contractAddress]/[tokenId]/components/token-actions-token-overview",
  () => ({
    default: () => <div>TokenActionsTokenOverview</div>,
  }),
);

describe("BuyNowDialog", () => {
  const mockToken: Token = {
    collection_image: "https://example.com/image.jpg",
    collection_name: "Test Collection",
    collection_address: "0x1234567890123456789012345678901234567890",
    owner: "0x0987654321098765432109876543210987654321",
    token_id: "1",
    last_price: "1000000000000000000",
    price: "1500000000000000000",
    metadata: {
      name: "Test Token",
      image: "https://example.com/token-image.jpg",
      animation_key: "",
      animation_url: "",
      image_key: "",
      attributes: [],
    },
  };

  const mockCollectionToken: CollectionToken = {
    buy_in_progress: false,
    collection_address: "0x1234567890123456789012345678901234567890",
    collection_name: "Test Collection",
    floor_difference: 10,
    is_listed: true,
    listed_at: Date.now(),
    listing: {
      is_auction: false,
      currency: {
        contract: ETH,
        decimals: 18,
        symbol: "ETH",
      },
    },
    owner: "0x0987654321098765432109876543210987654321",
    token_id: "2",
    last_price: "1000000000000000000",
    price: "1500000000000000000",
    metadata: {
      name: "Test Collection Token",
      image: "https://example.com/collection-token-image.jpg",
      animation_key: "",
      animation_url: "",
      image_key: "",
      attributes: [],
    },
  };

  const mockSetIsOpen = vi.fn();

  it("renders the dialog for Token when open", () => {
    render(
      <BuyNowDialog
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        isSuccess={false}
        token={mockToken}
        price="1500000000000000000"
      />,
    );

    expect(screen.getByText("Confirm your purchase")).toBeInTheDocument();
    expect(screen.getByText("NoListing")).toBeInTheDocument();
    expect(screen.getByText("TokenActionsTokenOverview")).toBeInTheDocument();
    expect(screen.getByText("Checking your payment")).toBeInTheDocument();
  });

  it("renders the dialog for CollectionToken when open", () => {
    render(
      <BuyNowDialog
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        isSuccess={false}
        token={mockCollectionToken}
        price="1500000000000000000"
      />,
    );

    expect(screen.getByText("Confirm your purchase")).toBeInTheDocument();
    expect(screen.getByText("NoListing")).toBeInTheDocument();
    expect(screen.getByText("TokenActionsTokenOverview")).toBeInTheDocument();
    expect(screen.getByText("Checking your payment")).toBeInTheDocument();
  });

  it("renders success state correctly", () => {
    render(
      <BuyNowDialog
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        isSuccess={true}
        token={mockToken}
        price="1500000000000000000"
      />,
    );

    expect(
      screen.getByText("Congratulations for your purchase"),
    ).toBeInTheDocument();
    expect(screen.getByText("Success")).toBeInTheDocument();
    expect(
      screen.getByText("Nice purchase, this NFT is now in your wallet ;)"),
    ).toBeInTheDocument();
    expect(screen.getByText("Continue to explore NFTs")).toBeInTheDocument();
  });

  it('calls setIsOpen when "Continue to explore NFTs" button is clicked', () => {
    render(
      <BuyNowDialog
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        isSuccess={true}
        token={mockToken}
        price="1500000000000000000"
      />,
    );

    fireEvent.click(screen.getByText("Continue to explore NFTs"));
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
  });
});
