import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentPortal from '../Comment.portal';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useMutation } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next-intl');
jest.mock('@/i18n/routing');
jest.mock('@tanstack/react-query');
jest.mock('@/feature/profile/api/updateComment');

jest.mock('@/feature/portal/component/Portal', () => {
    return function MockPortal({ title, children }) {
        return (
            <div data-testid="portal">
                <h2>{title}</h2>
                {children}
            </div>
        );
    };
});

jest.mock('@/common/form/InputFormItem', () => {
    return function MockInputFormItem({ label, value, onChange }) {
        return (
            <div>
                <label>{label}</label>
                <input
                    value={value}
                    onChange={onChange}
                    data-testid="comment-input"
                />
            </div>
        );
    };
});

jest.mock('@skillnavi/ui', () => ({
    ButtonStandard: ({ text, onClick }) => (
        <button onClick={onClick}>{text}</button>
    ),
}));

describe('CommentPortal', () => {
    const mockProfile = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        comment: 'Initial comment',
    };
    const mockClosePortal = jest.fn();
    const mockRouterRefresh = jest.fn();
    const mockMutate = jest.fn();

    beforeEach(() => {
        (useTranslations as jest.Mock).mockReturnValue((key) => key);
        (useRouter as jest.Mock).mockReturnValue({
            refresh: mockRouterRefresh,
        });
        (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders with initial comment and buttons', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CommentPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        expect(screen.getByText('Change Comment')).toBeInTheDocument();
        expect(
            screen.getByText('user.profile.changecomment.desc'),
        ).toBeInTheDocument();
        expect(screen.getByTestId('comment-input')).toHaveValue(
            'Initial comment',
        );
        expect(screen.getByText('OK')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('updates comment state on input change', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CommentPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        const commentInput = screen.getByTestId('comment-input');
        fireEvent.change(commentInput, { target: { value: 'New comment' } });
        expect(commentInput).toHaveValue('New comment');
    });

    it('calls mutate with correct data on OK button click', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CommentPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        const commentInput = screen.getByTestId('comment-input');
        fireEvent.change(commentInput, {
            target: { value: 'Updated comment' },
        });

        fireEvent.click(screen.getByText('OK'));

        expect(mockMutate).toHaveBeenCalledWith({
            uid: mockProfile.id.toString(),
            comment: 'Updated comment',
        });
    });

    it('calls closePortal and router.refresh on successful mutation', async () => {
        (useMutation as jest.Mock).mockImplementation((options) => ({
            mutate: (variables) => {
                options.onSuccess();
            },
        }));

        render(
            <QueryClientProvider client={new QueryClient()}>
                <CommentPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        fireEvent.click(screen.getByText('OK'));

        await waitFor(() => {
            expect(mockClosePortal).toHaveBeenCalled();
            expect(mockRouterRefresh).toHaveBeenCalled();
        });
    });

    it('calls closePortal on Cancel button click', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CommentPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockClosePortal).toHaveBeenCalled();
    });
});
