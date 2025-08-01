
import { render, screen, fireEvent } from '@testing-library/react';
import ProfileButton from '../ProfileButton';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { useRouter } from '@/i18n/routing';
import useProfileButtonPortal from '../useProfileButtonPortal';

jest.mock('next-intl');
jest.mock('next/navigation');
jest.mock('jotai');
jest.mock('@/i18n/routing');
jest.mock('../useProfileButtonPortal');

jest.mock('@skillnavi/ui', () => ({
  ButtonRounded: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

jest.mock('@/feature/profile/component/comment/Comment.portal', () => {
  return function MockCommentPortal() {
    return <div data-testid="comment-portal">Comment Portal</div>;
  };
});

jest.mock('@/feature/profile/component/opendata/OpenData.portal', () => {
  return function MockOpenDataPortal() {
    return <div data-testid="opendata-portal">Open Data Portal</div>;
  };
});

describe('ProfileButton', () => {
  const mockRouterPush = jest.fn();
  const mockOpenCommentPortal = jest.fn();
  const mockCloseCommentPortal = jest.fn();
  const mockOpenOpenDataPortal = jest.fn();
  const mockCloseOpenDataPortal = jest.fn();

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useAtomValue as jest.Mock).mockReturnValue(null); // No user by default
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useProfileButtonPortal as jest.Mock).mockReturnValue({
      displayCommentPortal: false,
      openCommentPortal: mockOpenCommentPortal,
      closeCommentPortal: mockCloseCommentPortal,
      displayOpenDataPortal: false,
      openOpenDataPortal: mockOpenOpenDataPortal,
      closeOpenDataPortal: mockCloseOpenDataPortal,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders playcount and cleartable buttons', () => {
    render(<ProfileButton />);
    expect(screen.getByText('profile.info.button.count')).toBeInTheDocument();
    expect(screen.getByText('profile.info.button.cleartable')).toBeInTheDocument();
    expect(screen.queryByText('profile.info.button.comment')).not.toBeInTheDocument();
    expect(screen.queryByText('profile.info.button.openinfo')).not.toBeInTheDocument();
  });

  it('calls router.push for playcount button', () => {
    render(<ProfileButton />);
    fireEvent.click(screen.getByText('profile.info.button.count'));
    expect(mockRouterPush).toHaveBeenCalledWith('/playcount?id=123&type=music');
  });

  it('calls router.push for cleartable button', () => {
    render(<ProfileButton />);
    fireEvent.click(screen.getByText('profile.info.button.cleartable'));
    expect(mockRouterPush).toHaveBeenCalledWith('/cleartable/123');
  });

  it('renders comment and openinfo buttons when user matches param ID', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ id: 123 });
    render(<ProfileButton />);
    expect(screen.getByText('profile.info.button.comment')).toBeInTheDocument();
    expect(screen.getByText('profile.info.button.openinfo')).toBeInTheDocument();
  });

  it('calls openCommentPortal when comment button is clicked', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ id: 123 });
    render(<ProfileButton />);
    fireEvent.click(screen.getByText('profile.info.button.comment'));
    expect(mockOpenCommentPortal).toHaveBeenCalled();
  });

  it('calls openOpenDataPortal when openinfo button is clicked', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ id: 123 });
    render(<ProfileButton />);
    fireEvent.click(screen.getByText('profile.info.button.openinfo'));
    expect(mockOpenOpenDataPortal).toHaveBeenCalled();
  });

  it('renders CommentPortal when displayCommentPortal is true', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ id: 123 });
    (useProfileButtonPortal as jest.Mock).mockReturnValue({
      displayCommentPortal: true,
      openCommentPortal: mockOpenCommentPortal,
      closeCommentPortal: mockCloseCommentPortal,
      displayOpenDataPortal: false,
      openOpenDataPortal: mockOpenOpenDataPortal,
      closeOpenDataPortal: mockCloseOpenDataPortal,
    });
    render(<ProfileButton />);
    expect(screen.getByTestId('comment-portal')).toBeInTheDocument();
  });

  it('renders OpenDataPortal when displayOpenDataPortal is true', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ id: 123 });
    (useProfileButtonPortal as jest.Mock).mockReturnValue({
      displayCommentPortal: false,
      openCommentPortal: mockOpenCommentPortal,
      closeCommentPortal: mockCloseCommentPortal,
      displayOpenDataPortal: true,
      openOpenDataPortal: mockOpenOpenDataPortal,
      closeOpenDataPortal: mockCloseOpenDataPortal,
    });
    render(<ProfileButton />);
    expect(screen.getByTestId('opendata-portal')).toBeInTheDocument();
  });
});
