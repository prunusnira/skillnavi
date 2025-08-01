import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TowerUpdateFloorIcon } from '../TowerUpdateFloorIcon';
import { useMutation } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

jest.mock('@tanstack/react-query');
jest.mock('@/feature/tower/api/changeTowerIcon');
jest.mock('jotai');
jest.mock('next-intl');

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

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

describe('TowerUpdateFloorIcon', () => {
    const mockMutate = jest.fn();
    const mockUser = { id: 123 };

    beforeEach(() => {
        (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });
        (useAtomValue as jest.Mock).mockReturnValue(mockUser);
        (useTranslations as jest.Mock).mockReturnValue((key) => key);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders button and opens portal on click', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <TowerUpdateFloorIcon icon="test-icon" />
            </QueryClientProvider>,
        );

        expect(screen.getByText('tower.changeIcon.button')).toBeInTheDocument();
        expect(screen.queryByTestId('portal')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('tower.changeIcon.button'));

        expect(screen.getByTestId('portal')).toBeInTheDocument();
        expect(screen.getByText('Change Icon')).toBeInTheDocument();
        expect(screen.getByAltText('icon')).toHaveAttribute(
            'src',
            '/img/title/test-icon.png',
        );
        expect(screen.getByText('tower.changeIcon.dialog')).toBeInTheDocument();
        expect(screen.getByText('YES')).toBeInTheDocument();
        expect(screen.getByText('NO')).toBeInTheDocument();
    });

    it('calls changeTowerIcon and closes portal on YES click', async () => {
        (useMutation as jest.Mock).mockImplementation((options) => ({
            mutate: (variables) => {
                options.onSuccess();
            },
        }));

        render(
            <QueryClientProvider client={new QueryClient()}>
                <TowerUpdateFloorIcon icon="test-icon" />
            </QueryClientProvider>,
        );

        fireEvent.click(screen.getByText('tower.changeIcon.button'));
        fireEvent.click(screen.getByText('YES'));

        expect(mockMutate).toHaveBeenCalledWith({
            uid: mockUser.id,
            icon: 'test-icon',
        });

        await waitFor(() => {
            expect(screen.queryByTestId('portal')).not.toBeInTheDocument();
        });
    });

    it('closes portal on NO click', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <TowerUpdateFloorIcon icon="test-icon" />
            </QueryClientProvider>,
        );

        fireEvent.click(screen.getByText('tower.changeIcon.button'));
        fireEvent.click(screen.getByText('NO'));

        expect(screen.queryByTestId('portal')).not.toBeInTheDocument();
    });

    it('does not render button if user is null', () => {
        (useAtomValue as jest.Mock).mockReturnValue(null);
        const { container } = render(
            <QueryClientProvider client={new QueryClient()}>
                <TowerUpdateFloorIcon icon="test-icon" />
            </QueryClientProvider>,
        );
        expect(container).toBeEmptyDOMElement();
    });
});
