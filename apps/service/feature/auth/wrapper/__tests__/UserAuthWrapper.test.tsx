import { render } from '@testing-library/react';
import UserAuthWrapper from '../UserAuthWrapper';
import { useAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from '@/i18n/routing';

jest.mock('jotai', () => ({
    useAtom: jest.fn(),
    atom: jest.fn(),
    useAtomValue: jest.fn(),
}));

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
}));

jest.mock('@/i18n/routing', () => ({
    useRouter: jest.fn(),
}));

describe('UserAuthWrapper', () => {
    it('should set user when session and profile exist', () => {
        const setUser = jest.fn();
        (useAtom as jest.Mock).mockReturnValue([
            null,
            setUser,
        ]);
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { email: 'test@example.com' } },
        });
        (useQuery as jest.Mock).mockReturnValue({
            data: { id: '1', name: 'Test User' },
        });
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push });

        render(<UserAuthWrapper />);

        expect(setUser).toHaveBeenCalledWith({ id: '1', name: 'Test User' });
        expect(push).not.toHaveBeenCalled();
    });

    it('should redirect to new user page when session exists but profile does not', () => {
        const setUser = jest.fn();
        (useAtom as jest.Mock).mockReturnValue([
            null,
            setUser,
        ]);
        (useSession as jest.Mock).mockReturnValue({
            data: { user: { email: 'test@example.com' } },
        });
        (useQuery as jest.Mock).mockReturnValue({ data: null });
        const push = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push });

        render(<UserAuthWrapper />);

        expect(setUser).not.toHaveBeenCalled();
        expect(push).toHaveBeenCalledWith(expect.any(String));
    });
});
