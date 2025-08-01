
import { render, screen } from '@testing-library/react';
import NavItem from '../NavItem';

describe('NavItem', () => {
  it('renders children correctly', () => {
    render(<NavItem><div>Test Child</div></NavItem>);
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
