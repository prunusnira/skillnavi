
import { render, screen } from '@testing-library/react';
import { SidebarBox } from '../SidebarBox';

describe('SidebarBox', () => {
  it('renders children correctly', () => {
    render(<SidebarBox><div>Test Child</div></SidebarBox>);
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
