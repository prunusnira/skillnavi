
import { renderHook, act } from '@testing-library/react';
import { usePatternMenu } from '../usePatternMenu';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

jest.mock('next/navigation');
jest.mock('@/i18n/routing');

describe('usePatternMenu', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(''));
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should toggle menu active state', () => {
    const { result } = renderHook(() => usePatternMenu());
    expect(result.current.active).toBe(false);

    act(() => {
      result.current.toggleMenu();
    });
    expect(result.current.active).toBe(true);

    act(() => {
      result.current.toggleMenu();
    });
    expect(result.current.active).toBe(false);
  });

  it('should update search params and navigate', () => {
    const { result } = renderHook(() => usePatternMenu());

    act(() => {
      result.current.updateSearchParams('key1', 'value1');
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/test-path?key1=value1');

    // Test with existing params
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('existingKey=existingValue'));
    const { result: result2 } = renderHook(() => usePatternMenu());

    act(() => {
      result2.current.updateSearchParams('key2', 'value2');
    });

    expect(mockRouterPush).toHaveBeenCalledWith('/test-path?existingKey=existingValue&key2=value2');
  });
});
