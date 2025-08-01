import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ResetDecision } from '../ResetDecision';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

jest.mock('next/navigation');
jest.mock('@/i18n/routing');
jest.mock('@tanstack/react-query');
jest.mock('@/feature/profile/api/resetUser');
jest.mock('next-auth/react');
jest.mock('next-intl');

describe('ResetDecision', () => {
    const mockRouterReplace = jest.fn();
    const mockSignOut = jest.fn();
    const mockAlert = jest.fn();
    const mockMutateAsync = jest.fn();

    beforeEach(() => {
        (useParams as jest.Mock).mockReturnValue({ id: '123' });
        (useRouter as jest.Mock).mockReturnValue({
            replace: mockRouterReplace,
        });
        (useTranslations as jest.Mock).mockReturnValue((key) => key);
        (signOut as jest.Mock).mockImplementation(mockSignOut);
        global.alert = mockAlert;

        // Mock useMutation to control its behavior
        (useMutation as jest.Mock).mockReturnValue({
            mutateAsync: mockMutateAsync,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders YES and NO buttons', () => {
        render(<ResetDecision />);
        expect(screen.getByText('YES')).toBeInTheDocument();
        expect(screen.getByText('NO')).toBeInTheDocument();
    });

    it('calls router.replace with LINK_PROFILE_SELF when NO button is clicked', () => {
        render(<ResetDecision />);
        fireEvent.click(screen.getByText('NO'));
        expect(mockRouterReplace).toHaveBeenCalledWith('/profile/self');
    });

    it('calls mutateAsync when YES button is clicked', () => {
        render(<ResetDecision />);
        fireEvent.click(screen.getByText('YES'));
        expect(mockMutateAsync).toHaveBeenCalledTimes(1);
    });

    it('calls signOut and redirects to LINK_MAIN on successful reset', async () => {
        // Simulate successful mutation
        (useMutation as jest.Mock).mockImplementation((options) => ({
            mutateAsync: jest.fn(() => {
                options.onSuccess();
                return Promise.resolve();
            }),
        }));

        // Mock window.location.href setter
        const originalLocation = window.location;
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { href: '' },
        });

        render(<ResetDecision />);
        fireEvent.click(screen.getByText('YES'));

        await waitFor(() => {
            expect(mockSignOut).toHaveBeenCalledTimes(1);
            expect(window.location.href).toBe('/'); // LINK_MAIN is usually '/'
        });

        // Restore original window.location
        Object.defineProperty(window, 'location', {
            writable: true,
            value: originalLocation,
        });
    });

    it('calls alert on failed reset', async () => {
        // Simulate failed mutation
        (useMutation as jest.Mock).mockImplementation((options) => ({
            mutateAsync: jest.fn(() => {
                options.onError();
                return Promise.reject();
            }),
        }));

        render(<ResetDecision />);
        fireEvent.click(screen.getByText('YES'));

        await waitFor(() => {
            expect(mockAlert).toHaveBeenCalledWith('reset.alert.invalid');
        });
    });
});
