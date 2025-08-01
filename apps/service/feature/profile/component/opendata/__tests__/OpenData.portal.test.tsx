import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import OpenDataPortal from '../OpenData.portal';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next-intl');
jest.mock('@tanstack/react-query');
jest.mock('@/feature/profile/api/updateOpenData');

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

jest.mock('@skillnavi/ui', () => ({
    ButtonStandard: ({ text, onClick }) => (
        <button onClick={onClick}>{text}</button>
    ),
}));

jest.mock('@skillnavi/ui/src/radio', () => ({
    RadioGroup: ({ itemList, currentValue, onChange }) => (
        <div>
            {itemList.map((item) => (
                <label key={item.id}>
                    <input
                        type="radio"
                        name={item.radioGroupName}
                        value={item.value}
                        checked={currentValue === item.value}
                        onChange={() => onChange(item.value)}
                    />
                    {item.display}
                </label>
            ))}
        </div>
    ),
}));

describe('OpenDataPortal', () => {
    const mockProfile = {
        id: '123',
        name: 'Test User',
        email: 'test@example.com',
        openinfo: true,
    };
    const mockClosePortal = jest.fn();
    const mockMutate = jest.fn();

    beforeEach(() => {
        (useTranslations as jest.Mock).mockReturnValue((key) => key);
        (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders with initial open status and buttons', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <OpenDataPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        expect(screen.getByText('Change Data Open Status')).toBeInTheDocument();
        expect(screen.getByLabelText('common.yesno.yes')).toBeChecked();
        expect(screen.getByLabelText('common.yesno.no')).not.toBeChecked();
        expect(screen.getByText('OK')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('updates open status on radio button change', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <OpenDataPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        fireEvent.click(screen.getByLabelText('common.yesno.no'));
        expect(screen.getByLabelText('common.yesno.no')).toBeChecked();
        expect(screen.getByLabelText('common.yesno.yes')).not.toBeChecked();
    });

    it('calls mutate with correct data on OK button click', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <OpenDataPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        fireEvent.click(screen.getByLabelText('common.yesno.no'));
        fireEvent.click(screen.getByText('OK'));

        expect(mockMutate).toHaveBeenCalledWith({
            uid: mockProfile.id.toString(),
            open: 'false',
        });
    });

    it('calls closePortal on successful mutation', async () => {
        (useMutation as jest.Mock).mockImplementation((options) => ({
            mutate: (variables) => {
                options.onSuccess();
            },
        }));

        render(
            <QueryClientProvider client={new QueryClient()}>
                <OpenDataPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        fireEvent.click(screen.getByText('OK'));

        await waitFor(() => {
            expect(mockClosePortal).toHaveBeenCalled();
        });
    });

    it('calls closePortal on Cancel button click', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <OpenDataPortal
                    profile={mockProfile as any}
                    closePortal={mockClosePortal}
                />
            </QueryClientProvider>,
        );

        fireEvent.click(screen.getByText('Cancel'));

        expect(mockClosePortal).toHaveBeenCalled();
    });
});
