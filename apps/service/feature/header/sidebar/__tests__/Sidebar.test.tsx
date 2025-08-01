import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

jest.mock('next-intl/server', () => ({
    getTranslations: jest.fn().mockResolvedValue((key) => key),
}));

jest.mock('@/i18n/routing', () => ({
    Link: ({ children, href }) => <a href={href}>{children}</a>,
}));

jest.mock('../item/SidebarWrapper', () => ({
    SidebarWrapper: ({ children }) => (
        <div data-testid="sidebar-wrapper">{children}</div>
    ),
}));

jest.mock('../item/SidebarMenuTitle', () => ({
    SidebarMenuTitle: ({ id }) => (
        <div data-testid={`sidebar-menu-title-${id}`}>{id}</div>
    ),
}));

jest.mock('../item/SidebarBox', () => ({
    SidebarBox: ({ children }) => (
        <div data-testid="sidebar-box">{children}</div>
    ),
}));

jest.mock('../item/SidebarSearch', () => ({
    SidebarSearch: () => (
        <div data-testid="sidebar-search">Mock Sidebar Search</div>
    ),
}));

describe('Sidebar', () => {
    it('renders sidebar components and menu items', async () => {
        render(await Sidebar());

        expect(screen.getByTestId('sidebar-wrapper')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar-search')).toBeInTheDocument();

        // Check for some expected menu titles based on SidebarMenuItems structure
        expect(
            screen.getByTestId('sidebar-menu-title-menu.main'),
        ).toBeInTheDocument();
        expect(
            screen.getByTestId('sidebar-menu-title-menu.skill'),
        ).toBeInTheDocument();

        // Check for sub-menu items (example: menu.main.home)
        expect(screen.getByText('menu.main.home')).toBeInTheDocument();
    });
});
