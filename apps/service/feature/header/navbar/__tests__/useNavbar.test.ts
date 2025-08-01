
import { renderHook, act } from '@testing-library/react';
import useNavbar from '../useNavbar';
import { useAtom } from 'jotai';
import { useRouter } from '@/i18n/routing';

jest.mock('jotai');
jest.mock('@/i18n/routing');

describe('useNavbar', () => {
  const mockSetEnv = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useAtom as jest.Mock).mockReturnValue([{ menu: false, option: false }, mockSetEnv]);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should return initial menu state', () => {
    const { result } = renderHook(() => useNavbar());
    expect(result.current.isMenuOpen).toBe(false);
  });

  it('should call router.push when handleLinkMain is called', () => {
    const { result } = renderHook(() => useNavbar());
    act(() => {
      result.current.handleLinkMain();
    });
    expect(mockPush).toHaveBeenCalledWith(expect.any(String));
  });

  it('should toggle menu state when controlMenu is called', () => {
    const { result } = renderHook(() => useNavbar());
    act(() => {
      result.current.controlMenu();
    });
    expect(mockSetEnv).toHaveBeenCalledWith({ menu: true });
  });

  it('should toggle option state when controlOption is called', () => {
    const { result } = renderHook(() => useNavbar());
    act(() => {
      result.current.controlOption();
    });
    expect(mockSetEnv).toHaveBeenCalledWith({ option: true });
  });
});
