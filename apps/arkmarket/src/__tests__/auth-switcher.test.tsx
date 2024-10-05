/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from "vitest";
import AuthSwitcher from "../components/auth-switcher";

vi.mock("@starknet-react/core", () => ({
  useAccount: vi.fn(),
  useConnect: vi.fn(() => ({
    connect: vi.fn(),
    connectors: [],
  })),
}));

vi.mock("../components/authentication", () => ({
  default: () => (
    <div data-testid="authentication-component">Authentication Component</div>
  ),
}));


import { useAccount, useConnect } from "@starknet-react/core";

describe("AuthSwitcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useConnect as any).mockReturnValue({
      connect: vi.fn(),
      connectors: [],
    });
  });

  it('renders Authentication component when account is undefined', () => {
    (useAccount as any).mockReturnValue({ account: undefined });

    render(<AuthSwitcher>
      <div>Child Component</div>
    </AuthSwitcher>);

    expect(screen.getByTestId('authentication-component')).toBeInTheDocument();
    expect(screen.queryByText('Child Component')).not.toBeInTheDocument();
  });

  it('renders children when account is defined', () => {
    (useAccount as any).mockReturnValue({ account: { address: '0x123' } });

    render(<AuthSwitcher>
      <div>Child Component</div>
    </AuthSwitcher>);

    expect(screen.queryByTestId('authentication-component')).not.toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders children when account is null', () => {
    (useAccount as any).mockReturnValue({ account: null });

    render(<AuthSwitcher>
      <div>Child Component</div>
    </AuthSwitcher>);

    expect(screen.queryByTestId('authentication-component')).not.toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });
});