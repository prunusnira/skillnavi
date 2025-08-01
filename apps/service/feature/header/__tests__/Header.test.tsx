
import { render, screen } from '@testing-library/react';
import Header from '../Header';

jest.mock('@/feature/header/navbar/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Mock Navbar</div>;
  };
});

jest.mock('@/feature/header/sidebar/Sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="sidebar">Mock Sidebar</div>;
  };
});

jest.mock('@/feature/header/Notice', () => {
  return function MockHeaderNotice() {
    return <div data-testid="header-notice">Mock Header Notice</div>;
  };
});

jest.mock('@/feature/header/option/Option', () => {
  return function MockOption() {
    return <div data-testid="option">Mock Option</div>;
  };
});

describe('Header', () => {
  it('renders Navbar, Sidebar, HeaderNotice, and Option components', () => {
    render(<Header />);

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('header-notice')).toBeInTheDocument();
    expect(screen.getByTestId('option')).toBeInTheDocument();
  });
});
