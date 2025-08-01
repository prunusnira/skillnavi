import { renderHook } from '@testing-library/react';
import { useSidebar } from '../useSidebar';
import { useAtom } from 'jotai';
import { usePathname } from '@/i18n/routing';

jest.mock('jotai');
jest.mock('@/i18n/routing');

describe('useSidebar', () => {
    let mockSetEnv: jest.Mock;

    beforeEach(() => {
        mockSetEnv = jest.fn();
        (useAtom as jest.Mock).mockReturnValue([
            { menu: true },
            mockSetEnv,
        ]);
        (usePathname as jest.Mock).mockReturnValue('/initial-path');
    });

    it('should return initial menu state', () => {
        const { result } = renderHook(() => useSidebar());
        expect(result.current.isMenuOpen).toBe(true);
    });

    it('should close menu on pathname change', () => {
        const { rerender } = renderHook(() => useSidebar());

        // Simulate pathname change
        (usePathname as jest.Mock).mockReturnValue('/new-path');
        rerender();

        expect(mockSetEnv).toHaveBeenCalledWith({ menu: false });
    });
});
