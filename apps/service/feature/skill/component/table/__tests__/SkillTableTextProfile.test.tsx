
import { render, screen } from '@testing-library/react';
import SkillTableTextProfile from '../SkillTableTextProfile';
import { Profile } from '@/feature/profile/data/Profile';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('SkillTableTextProfile', () => {
  it('renders profile with title tower', () => {
    const mockProfile: Profile = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      titletower: 'gold',
    };
    render(<SkillTableTextProfile profile={mockProfile} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByAltText('tower')).toHaveAttribute('src', '/img/title/gold.png');
  });

  it('renders profile without title tower', () => {
    const mockProfile: Profile = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      titletower: undefined,
    };
    render(<SkillTableTextProfile profile={mockProfile} />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.queryByAltText('tower')).not.toBeInTheDocument();
  });
});
