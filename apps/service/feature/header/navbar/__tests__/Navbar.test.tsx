
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar';
import useNavbar from '../useNavbar';
import { useTranslations } from 'next-intl';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from '@/i18n/routing';

jest.mock('../useNavbar');
jest.mock('next-intl');
jest.mock('next-auth/react');
jest.mock('@/i18n/routing');

describe('Navbar', () => {
  beforeEach(() => {
    (useNavbar as jest.Mock).mockReturnValue({
      handleLinkMain: jest.fn(),
      controlOption: jest.fn(),
    });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
    (useSession as jest.Mock).mockReturnValue({ data: null });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (signOut as jest.Mock).mockResolvedValue(undefined);
  });

  it('renders logo and title', () => {
    render(<Navbar />);
    expect(screen.getByText('Skill Navigator')).toBeInTheDocument();
  });

  it('calls handleLinkMain when logo is clicked', () => {
    const { handleLinkMain } = useNavbar() as any;
    render(<Navbar />);
    fireEvent.click(screen.getByText('Skill Navigator'));
    expect(handleLinkMain).toHaveBeenCalled();
  });

  it('calls router.push with discord link when discord icon is clicked', () => {
    const { push } = useRouter() as any;
    render(<Navbar />);
    fireEvent.click(screen.getByTestId('fa-icon-discord')); // Assuming FontAwesomeIcon has a test ID
    expect(push).toHaveBeenCalledWith(expect.stringContaining('discord'));
  });

  it('calls controlOption when gear icon is clicked', () => {
    const { controlOption } = useNavbar() as any;
    render(<Navbar />);
    fireEvent.click(screen.getByTestId('fa-icon-gear')); // Assuming FontAwesomeIcon has a test ID
    expect(controlOption).toHaveBeenCalled();
  });

  it('renders login button when not authenticated and calls router.push on click', () => {
    const { push } = useRouter() as any;
    render(<Navbar />);
    const loginButton = screen.getByText('navbar.login');
    expect(loginButton).toBeInTheDocument();
    fireEvent.click(loginButton);
    expect(push).toHaveBeenCalledWith(expect.stringContaining('login'));
  });

  it('renders logout button when authenticated and calls signOut on click', () => {
    (useSession as jest.Mock).mockReturnValue({ data: { user: { name: 'Test' } } });
    render(<Navbar />);
    const logoutButton = screen.getByText('navbar.logout');
    expect(logoutButton).toBeInTheDocument();
    fireEvent.click(logoutButton);
    expect(signOut).toHaveBeenCalled();
  });
});
