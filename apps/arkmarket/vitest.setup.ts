/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { configure } from '@testing-library/react';

// Aumentar el tiempo de espera predeterminado para waitFor
configure({ asyncUtilTimeout: 2000 });

// Suprimir advertencias de consola específicas
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: An update to') ||
     args[0].includes('Warning: The current testing environment is not configured to support act'))
  ) {
    return;
  }
  originalConsoleError(...args);
};

// Mockear ResizeObserver que suele causar problemas en entornos de prueba
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// Mockear window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Limpiar todos los mocks después de cada prueba
afterEach(() => {
  vi.clearAllMocks();
});