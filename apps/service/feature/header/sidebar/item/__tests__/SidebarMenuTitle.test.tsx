import { render, screen } from '@testing-library/react';
import { SidebarMenuTitle } from '../SidebarMenuTitle';

jest.mock('next-intl/server', () => ({
    getTranslations: jest.fn().mockResolvedValue((key) => key),
}));

jest.mock('@/i18n/routing', () => ({
    Link: ({ children, href, 'aria-disabled': ariaDisabled }) => (
        <a
            href={href}
            aria-disabled={ariaDisabled}
        >
            {children}
        </a>
    ),
}));

jest.mock('next/image', () => ({
    __esModule: true,
    default: (props) => {
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} />;
    },
}));

describe('SidebarMenuTitle', () => {
    it('renders title and icon with valid href', async () => {
        render(
            await SidebarMenuTitle({
                id: 'menu.test',
                iconSrc: '/test-icon.png',
                href: '/test-link',
            }),
        );

        expect(screen.getByText('menu.test')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            '/test-icon.png',
        );
        expect(screen.getByRole('link')).toHaveAttribute('href', '/test-link');
        expect(screen.getByRole('link')).not.toHaveAttribute(
            'aria-disabled',
            'true',
        );
    });

    it('renders title and icon without href', async () => {
        render(
            await SidebarMenuTitle({
                id: 'menu.test',
                iconSrc: '/test-icon.png',
            }),
        );

        expect(screen.getByText('menu.test')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            '/test-icon.png',
        );
        expect(screen.getByRole('link')).toHaveAttribute('href', '');
        expect(screen.getByRole('link')).toHaveAttribute(
            'aria-disabled',
            'true',
        );
    });
});
