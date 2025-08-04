import { render, screen, fireEvent } from '@testing-library/react';
import AnchorText from '../AnchorText';
import { useRouter } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@/i18n/data/ko.json';

jest.mock('@/i18n/routing');

describe('AnchorText', () => {
    const mockRouterPush = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders text and calls router.push on click', () => {
        render(
            <NextIntlClientProvider
                locale={'ko'}
                messages={{ messages }}
            >
                <AnchorText
                    text="Click Me"
                    path="/test-path"
                />
            </NextIntlClientProvider>,
        );
        const textElement = screen.getByText('Click Me');
        expect(textElement).toBeInTheDocument();

        fireEvent.click(textElement);
        expect(mockRouterPush).toHaveBeenCalledWith('/test-path');
    });

    it('applies custom class name', () => {
        render(
            <NextIntlClientProvider
                locale={'ko'}
                messages={{ messages }}
            >
                <AnchorText
                    text="Styled Text"
                    path="/path"
                    className="custom-class"
                />
            </NextIntlClientProvider>,
        );
        expect(screen.getByText('Styled Text')).toHaveClass('custom-class');
    });
});
