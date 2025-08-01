
import { render, screen, fireEvent } from '@testing-library/react';
import UserButton from '../UserButton';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

jest.mock('@/i18n/routing');
jest.mock('next-intl');

jest.mock('@skillnavi/ui', () => ({
  ButtonStandard: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

describe('UserButton', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all user-related buttons', () => {
    render(<UserButton />);
    expect(screen.getByText('main.user.button.profile')).toBeInTheDocument();
    expect(screen.getByText('main.user.button.mygf')).toBeInTheDocument();
    expect(screen.getByText('main.user.button.mydm')).toBeInTheDocument();
    expect(screen.getByText('main.user.button.playcount')).toBeInTheDocument();
  });

  it('calls router.push with correct path for profile button', () => {
    render(<UserButton />);
    fireEvent.click(screen.getByText('main.user.button.profile'));
    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/profile/self'));
  });

  it('calls router.push with correct path for mygf button', () => {
    render(<UserButton />);
    fireEvent.click(screen.getByText('main.user.button.mygf'));
    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/skill/gf/self'));
  });

  it('calls router.push with correct path for mydm button', () => {
    render(<UserButton />);
    fireEvent.click(screen.getByText('main.user.button.mydm'));
    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/skill/dm/self'));
  });

  it('calls router.push with correct path for playcount button', () => {
    render(<UserButton />);
    fireEvent.click(screen.getByText('main.user.button.playcount'));
    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/playcount'));
  });
});
