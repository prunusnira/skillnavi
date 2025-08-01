
import { renderHook, act } from '@testing-library/react';
import useTheme from '../useTheme';
import { useAtom } from 'jotai';
import { useCookie } from '@/feature/cookie/hook/useCookie';
import { CookieParser } from '@skillnavi/data/src/cookie';

jest.mock('jotai');
jest.mock('@/feature/cookie/hook/useCookie');
jest.mock('@skillnavi/data/src/cookie');

describe('useTheme', () => {
  let mockSetEnv: jest.Mock;
  let mockUpdateCookie: jest.Mock;
  let mockGetCookie: jest.Mock;

  beforeEach(() => {
    mockSetEnv = jest.fn();
    mockUpdateCookie = jest.fn();
    mockGetCookie = jest.fn();

    (useAtom as jest.Mock).mockReturnValue([{ theme: 'light' }, mockSetEnv]);
    (useCookie as jest.Mock).mockReturnValue({ update: mockUpdateCookie });
    (CookieParser.getInstance as jest.Mock).mockReturnValue({
      parseCookie: jest.fn(),
      getCookie: mockGetCookie,
    });

    // Mock document.getElementsByTagName for DOM manipulation tests
    Object.defineProperty(document, 'getElementsByTagName', {
      value: jest.fn(() => [{
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      }]),
    });
  });

  it('should initialize theme to light if no cookie exists', () => {
    mockGetCookie.mockReturnValue(undefined);
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.loadTheme();
    });

    expect(mockSetEnv).toHaveBeenCalledWith({ theme: 'light' });
    expect(mockUpdateCookie).toHaveBeenCalledWith({ key: 'theme', value: 'light' });
  });

  it('should load theme from cookie if it exists', () => {
    mockGetCookie.mockReturnValue('dark');
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.loadTheme();
    });

    expect(mockSetEnv).toHaveBeenCalledWith({ theme: 'dark' });
    expect(mockUpdateCookie).toHaveBeenCalledWith({ key: 'theme', value: 'dark' });
  });

  it('should change theme and update cookie', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.changeTheme('dark');
    });

    expect(mockUpdateCookie).toHaveBeenCalledWith({ key: 'theme', value: 'dark' });
    expect(mockSetEnv).toHaveBeenCalledWith({ theme: 'dark' });
  });

  it('should add dark class to html when theme is dark', () => {
    (useAtom as jest.Mock).mockReturnValue([{ theme: 'dark' }, mockSetEnv]);
    renderHook(() => useTheme());

    expect(document.getElementsByTagName('html')[0].classList.add).toHaveBeenCalledWith('dark');
    expect(document.getElementsByTagName('html')[0].classList.remove).not.toHaveBeenCalledWith('dark');
  });

  it('should remove dark class from html when theme is light', () => {
    (useAtom as jest.Mock).mockReturnValue([{ theme: 'light' }, mockSetEnv]);
    renderHook(() => useTheme());

    expect(document.getElementsByTagName('html')[0].classList.remove).toHaveBeenCalledWith('dark');
    expect(document.getElementsByTagName('html')[0].classList.add).not.toHaveBeenCalledWith('dark');
  });
});
