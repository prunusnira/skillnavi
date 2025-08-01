import { render, screen, fireEvent } from '@testing-library/react';
import ClearTableOption from '../ClearTableOption';
import { usePathname, useRouter } from '@/i18n/routing';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
}));

jest.mock('@/i18n/routing', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
}));

jest.mock('jotai', () => ({
    useAtomValue: jest.fn(),
    atom: jest.fn(),
}));

jest.mock('@/common/versionSelector/VersionSelector', () => ({
    VersionSelector: () => {
        return (
            <select
                onChange={() => {
                    window.location.replace(
                        `${window.location.href}?version=27`,
                    );
                }}
            >
                <option value={'27'}>27</option>
            </select>
        );
    },
}));

describe('ClearTableOption', () => {
    it('calls router.replace with correct params when type is changed', () => {
        const replace = jest.fn();
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        (usePathname as jest.Mock).mockReturnValue('/test');
        (useRouter as jest.Mock).mockReturnValue({ replace });
        (useAtomValue as jest.Mock).mockReturnValue({ id: 28 });

        render(<ClearTableOption />);

        fireEvent.click(screen.getByText('GF'));
        expect(replace).toHaveBeenCalledWith('/test?type=gf');

        fireEvent.click(screen.getByText('DM'));
        expect(replace).toHaveBeenCalledWith('/test?type=dm');
    });

    it('calls router.replace with correct params when version is changed', () => {
        const replace = jest.fn();
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
        (usePathname as jest.Mock).mockReturnValue('/test');
        (useRouter as jest.Mock).mockReturnValue({ replace });
        (useAtomValue as jest.Mock).mockReturnValue({ id: 28 });

        render(<ClearTableOption />);

        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: '27' },
        });
        expect(replace).toHaveBeenCalledWith('/test?version=27');
    });
});
