
import { renderHook, act } from '@testing-library/react';
import useProfileButtonPortal from '../useProfileButtonPortal';

describe('useProfileButtonPortal', () => {
  it('should manage comment portal state', () => {
    const { result } = renderHook(() => useProfileButtonPortal());

    expect(result.current.displayCommentPortal).toBe(false);

    act(() => {
      result.current.openCommentPortal();
    });
    expect(result.current.displayCommentPortal).toBe(true);

    act(() => {
      result.current.closeCommentPortal();
    });
    expect(result.current.displayCommentPortal).toBe(false);
  });

  it('should manage open data portal state', () => {
    const { result } = renderHook(() => useProfileButtonPortal());

    expect(result.current.displayOpenDataPortal).toBe(false);

    act(() => {
      result.current.openOpenDataPortal();
    });
    expect(result.current.displayOpenDataPortal).toBe(true);

    act(() => {
      result.current.closeOpenDataPortal();
    });
    expect(result.current.displayOpenDataPortal).toBe(false);
  });
});
