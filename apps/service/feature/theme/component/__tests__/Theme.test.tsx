
import { renderHook } from '@testing-library/react';
import Theme from '../Theme';
import useTheme from '@/feature/header/option/useTheme';
import { useEffect } from 'react';

jest.mock('@/feature/header/option/useTheme');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('Theme', () => {
  const mockLoadTheme = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ loadTheme: mockLoadTheme });
    (useEffect as jest.Mock).mockImplementation((cb) => cb()); // Immediately run useEffect callback
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call loadTheme on mount', () => {
    renderHook(() => Theme());
    expect(mockLoadTheme).toHaveBeenCalledTimes(1);
  });
});
