
import { renderHook, act } from '@testing-library/react';
import useSkillMenu from '../useSkillMenu';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

jest.mock('jotai');
jest.mock('next/navigation');
jest.mock('@/i18n/routing');

describe('useSkillMenu', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useAtomValue as jest.Mock).mockReturnValue([
      { id: 28, full: 'GITADORA FUZZ-UP' },
      { id: 27, full: 'GITADORA HIGH-VOLTAGE' },
    ]);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('version=28'));
    (usePathname as jest.Mock).mockReturnValue('/skill/self');
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSkillMenu());
    expect(result.current.active).toBe(false);
    expect(result.current.currentVersion).toBe(28);
    expect(result.current.versionSelectOption).toEqual([
      { value: '28', display: 'GITADORA FUZZ-UP' },
      { value: '27', display: 'GITADORA HIGH-VOLTAGE' },
    ]);
  });

  it('should toggle menu active state', () => {
    const { result } = renderHook(() => useSkillMenu());
    act(() => {
      result.current.toggleMenu();
    });
    expect(result.current.active).toBe(true);
  });

  it('should update version search param', () => {
    const { result } = renderHook(() => useSkillMenu());
    const mockEvent = { currentTarget: { value: '27' } } as React.ChangeEvent<HTMLSelectElement>;
    act(() => {
      result.current.onChangeVersion(mockEvent);
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/skill/self?version=27');
  });

  it('should update table display search param', () => {
    const { result } = renderHook(() => useSkillMenu());
    act(() => {
      result.current.onChangeTable('list');
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/skill/self?version=28&display=list');
  });

  it('should update data type search param', () => {
    const { result } = renderHook(() => useSkillMenu());
    act(() => {
      result.current.onChangeData('all');
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/skill/self?version=28&pageType=all');
  });

  it('should update game type search param', () => {
    const { result } = renderHook(() => useSkillMenu());
    act(() => {
      result.current.onChangeGame('dm');
    });
    expect(mockRouterPush).toHaveBeenCalledWith('/skill/self?version=28&game=dm');
  });
});
