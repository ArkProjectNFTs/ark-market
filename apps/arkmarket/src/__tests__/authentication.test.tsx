/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Authentication from '../components/authentication';

vi.mock('next/image', () => ({
  default: (props: any) => <img {...props} />,
}));

vi.mock('@starknet-react/core', () => ({
  useConnect: vi.fn(),
}));

import { useConnect } from "@starknet-react/core";

describe("Authentication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useConnect as any).mockReturnValue({
      connectors: [
        { id: 'connector1', name: 'Connector 1' },
        { id: 'connector2', name: 'Connector 2' },
      ],
      connect: vi.fn(),
    });
  });

  it('renders the component correctly', () => {
    render(<Authentication />);
    
    expect(screen.getByText('Connect your wallet')).toBeInTheDocument();
    expect(screen.getByText('Choose a starknet wallet to start with')).toBeInTheDocument();
    expect(screen.getByText('Connector 1')).toBeInTheDocument();
    expect(screen.getByText('Connector 2')).toBeInTheDocument();
  });

  it('calls connect function when a connector button is clicked', () => {
    const connectMock = vi.fn();
    (useConnect as any).mockReturnValue({
      connectors: [{ id: 'connector1', name: 'Connector 1' }],
      connect: connectMock,
    });

    render(<Authentication />);
    
    const connectButton = screen.getByText('Connector 1');
    fireEvent.click(connectButton);
    
    expect(connectMock).toHaveBeenCalledWith({ connector: { id: 'connector1', name: 'Connector 1' } });
  });

  it('renders the correct image for mobile view', () => {
    render(<Authentication />);
    
    const mobileImage = screen.getByAltText('Authentication');
    expect(mobileImage).toHaveAttribute('src', '/authentication-dark.png');
  });

  it('renders the ArkMarket logo and name', () => {
    render(<Authentication />);
    
    expect(screen.getByText('ArkMarket')).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });

  it('renders the quote correctly', () => {
    render(<Authentication />);
    
    const quote = screen.getByText(/This SDK integrates the Ark Project core library/);
    expect(quote).toBeInTheDocument();
    expect(screen.getByText('Ark Project')).toBeInTheDocument();
  });
});