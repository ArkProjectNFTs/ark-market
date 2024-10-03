import { render, screen } from '@testing-library/react';
import ExternalLink from '../components/external-link';
import { describe, expect, it } from 'vitest';

describe('ExternalLink', () => {
  it('renders the link with correct attributes', () => {
    render(<ExternalLink href="https://example.com">Click me</ExternalLink>);
    
    const link = screen.getByRole('link', { name: /click me/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('rel', 'noreferrer');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('applies custom className', () => {
    render(
      <ExternalLink href="https://example.com" className="custom-class">
        Custom Link
      </ExternalLink>
    );
    
    const link = screen.getByRole('link', { name: /custom link/i });
    expect(link).toHaveClass('custom-class');
  });

  it('renders children correctly', () => {
    render(
      <ExternalLink href="https://example.com">
        <span>Child Element</span>
      </ExternalLink>
    );
    
    const childElement = screen.getByText('Child Element');
    expect(childElement).toBeInTheDocument();
    expect(childElement.tagName).toBe('SPAN');
  });

  it('passes through additional props', () => {
    render(
      <ExternalLink href="https://example.com" data-testid="test-link">
        Test Link
      </ExternalLink>
    );
    
    const link = screen.getByTestId('test-link');
    expect(link).toBeInTheDocument();
  });
});