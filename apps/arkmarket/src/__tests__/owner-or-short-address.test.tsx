/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ownerOrShortAddress from '../lib/ownerOrShortAddress';
import { validateAndParseAddress } from 'starknet';
import { shortAddress } from '@ark-market/ui';

vi.mock('starknet', () => ({
  validateAndParseAddress: vi.fn(address => address),
}));

vi.mock('@ark-market/ui', () => ({
  shortAddress: vi.fn(address => `short_${address}`),
}));

describe('ownerOrShortAddress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns short address when no address is provided', () => {
    const result = ownerOrShortAddress({ ownerAddress: '0x123456789' });
    expect(validateAndParseAddress).toHaveBeenCalledWith('0x123456789');
    expect(shortAddress).toHaveBeenCalledWith('0x123456789');
    expect(result).toBe('short_0x123456789');
  });

  it('returns "You" when ownerAddress matches address', () => {
    const result = ownerOrShortAddress({ 
      ownerAddress: '0x123456789', 
      address: '0x123456789' 
    });
    expect(validateAndParseAddress).toHaveBeenCalledTimes(2);
    expect(result).toBe('You');
  });

  it('returns short address of owner when addresses do not match', () => {
    const result = ownerOrShortAddress({ 
      ownerAddress: '0x123456789', 
      address: '0x987654321' 
    });
    expect(validateAndParseAddress).toHaveBeenCalledTimes(2);
    expect(shortAddress).toHaveBeenCalledWith('0x123456789');
    expect(result).toBe('short_0x123456789');
  });

  it('handles different address formats correctly', () => {
    (validateAndParseAddress as any).mockImplementation((addr: string) => addr.toLowerCase());
    
    const result = ownerOrShortAddress({ 
      ownerAddress: '0xABCDEF123', 
      address: '0xabcdef123' 
    });
    expect(validateAndParseAddress).toHaveBeenCalledTimes(2);
    expect(result).toBe('You');
  });

  it('throws an error for invalid addresses', () => {
    (validateAndParseAddress as any).mockImplementation(() => {
      throw new Error('Invalid address');
    });

    expect(() => ownerOrShortAddress({ ownerAddress: 'invalid' }))
      .toThrow('Invalid address');
  });
});