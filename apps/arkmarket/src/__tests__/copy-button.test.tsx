/* eslint-disable @typescript-eslint/unbound-method */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CopyButton from '../components/copy-button';
import { describe, expect, it, beforeEach, vi } from 'vitest';

describe('CopyButton', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders the copy button', () => {
    render(<CopyButton textToCopy="Hello, World!" className="" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('copies the text when clicked', async () => {
    render(<CopyButton textToCopy="Hello, World!" className="" />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip', { name: /copied/i });
      expect(tooltip).toBeInTheDocument();
    });

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello, World!');
  });
});