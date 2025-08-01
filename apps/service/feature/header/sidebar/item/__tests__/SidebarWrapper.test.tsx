import { render, screen } from '@testing-library/react';
import { SidebarWrapper } from '../SidebarWrapper';
import { useSidebar } from '../../useSidebar';

jest.mock('../useSidebar');

describe('SidebarWrapper', () => {
    it('renders children and applies correct class when menu is open', () => {
        (useSidebar as jest.Mock).mockReturnValue({ isMenuOpen: true });
        render(
            <SidebarWrapper>
                <div>Test Child</div>
            </SidebarWrapper>,
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
        expect(screen.getByText('Test Child').closest('section')).toHaveClass(
            'right-0',
        );
        expect(
            screen.getByText('Test Child').closest('section'),
        ).not.toHaveClass('-right-full');
    });

    it('renders children and applies correct class when menu is closed', () => {
        (useSidebar as jest.Mock).mockReturnValue({ isMenuOpen: false });
        render(
            <SidebarWrapper>
                <div>Test Child</div>
            </SidebarWrapper>,
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
        expect(screen.getByText('Test Child').closest('section')).toHaveClass(
            '-right-full',
        );
        expect(
            screen.getByText('Test Child').closest('section'),
        ).not.toHaveClass('right-0');
    });
});
