
import { render, screen } from '@testing-library/react';
import UserBox from '../UserBox';
import { Profile } from '@/feature/profile/data/Profile';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('UserBox', () => {
  it('renders user information with title and icon', () => {
    const mockProfile: Profile = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      title: 'Master',
      titletower: 'gold',
    };

    render(<UserBox mydata={mockProfile} />);

    expect(screen.getByText('(Master)')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('icon')).toHaveAttribute('src', '/img/title/gold.png');
  });

  it('renders user information without icon if titletower is not provided', () => {
    const mockProfile: Profile = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      title: 'Master',
      titletower: undefined,
    };

    render(<UserBox mydata={mockProfile} />);

    expect(screen.getByText('(Master)')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.queryByAltText('icon')).not.toBeInTheDocument();
  });
});
