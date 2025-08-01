
import { render, screen, fireEvent } from '@testing-library/react';
import UserLinkIcon from '../UserLinkIcon';
import { useRouter } from '@/i18n/routing';

jest.mock('@/i18n/routing');

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('UserLinkIcon', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user name and icon when openinfo is true and titletower exists', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      titletower: 'gold',
      openinfo: true,
    };
    render(<UserLinkIcon user={mockUser} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('icon')).toHaveAttribute('src', '/img/title/gold.png');
  });

  it('renders user name without icon when openinfo is true and titletower is null', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      titletower: null,
      openinfo: true,
    };
    render(<UserLinkIcon user={mockUser} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.queryByAltText('icon')).not.toBeInTheDocument();
  });

  it('renders (NO NAME) when openinfo is false', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      titletower: 'gold',
      openinfo: false,
    };
    render(<UserLinkIcon user={mockUser} />);

    expect(screen.getByText('(NO NAME)')).toBeInTheDocument();
    expect(screen.queryByText('Test User')).not.toBeInTheDocument();
  });

  it('calls router.push when openinfo is true and clicked', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      titletower: 'gold',
      openinfo: true,
    };
    render(<UserLinkIcon user={mockUser} />);

    fireEvent.click(screen.getByText('Test User'));
    expect(mockRouterPush).toHaveBeenCalledWith('/profile/1');
  });

  it('does not call router.push when openinfo is false and clicked', () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      titletower: 'gold',
      openinfo: false,
    };
    render(<UserLinkIcon user={mockUser} />);

    fireEvent.click(screen.getByText('(NO NAME)'));
    expect(mockRouterPush).not.toHaveBeenCalled();
  });
});
