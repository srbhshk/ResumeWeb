import React from 'react';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    return React.createElement('img', props);
  },
}));

// Mock @vercel/blob
jest.mock('@vercel/blob', () => ({
  put: jest.fn().mockImplementation((name) => {
    return Promise.resolve({
      url: `https://mock-blob-storage-link/${name}`,
    });
  }),
}));
