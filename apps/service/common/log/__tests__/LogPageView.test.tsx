
import { renderHook } from '@testing-library/react';
import { LogPageView } from '../LogPageView';
import { usePathname } from '@/i18n/routing';
import { useAtomValue } from 'jotai';
import { createLog } from '@skillnavi/data/src/log/createLog';
import { useEffect } from 'react';

jest.mock('@/i18n/routing');
jest.mock('jotai');
jest.mock('@skillnavi/data/src/log/createLog');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

describe('LogPageView', () => {
  const mockCreateLog = jest.fn();

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useAtomValue as jest.Mock).mockReturnValue({ id: 123 });
    (createLog as jest.Mock).mockImplementation(mockCreateLog);
    (useEffect as jest.Mock).mockImplementation((cb) => cb()); // Immediately run useEffect callback
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createLog with correct pageview data', () => {
    renderHook(() => LogPageView());
    expect(mockCreateLog).toHaveBeenCalledWith({
      uid: 123,
      action: 'pageview',
      data: '/test-path',
    });
  });

  it('should call createLog with uid 0 if user is null', () => {
    (useAtomValue as jest.Mock).mockReturnValue(null);
    renderHook(() => LogPageView());
    expect(mockCreateLog).toHaveBeenCalledWith({
      uid: 0,
      action: 'pageview',
      data: '/test-path',
    });
  });

  it('should call createLog when pathname changes', () => {
    const { rerender } = renderHook(() => LogPageView());
    mockCreateLog.mockClear(); // Clear previous calls

    (usePathname as jest.Mock).mockReturnValue('/new-path');
    rerender();

    expect(mockCreateLog).toHaveBeenCalledWith({
      uid: 123,
      action: 'pageview',
      data: '/new-path',
    });
  });
});
