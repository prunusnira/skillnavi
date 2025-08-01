
import { render, screen, fireEvent } from '@testing-library/react';
import { CriticalButton } from '../CriticalButton';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';

jest.mock('@/i18n/routing');
jest.mock('next-intl');
jest.mock('next/navigation');
jest.mock('jotai');

jest.mock('@/common/card/Card', () => {
  return function MockCard({ title, children }) {
    return (
      <div data-testid="card">
        <h2 data-testid="card-title">{title}</h2>
        {children}
      </div>
    );
  };
});

jest.mock('@skillnavi/ui', () => ({
  ButtonStandard: ({ text, onClick, customClass }) => (
    <button onClick={onClick} className={customClass}>{text}</button>
  ),
}));

describe('CriticalButton', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useAtomValue as jest.Mock).mockReturnValue({ id: 123 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the button when user and ID match', () => {
    render(<CriticalButton />);
    expect(screen.getByText('profile.critical.button.reset')).toBeInTheDocument();
    expect(screen.getByTestId('card-title')).toHaveTextContent('profile.critical.title');
  });

  it('does not render when user is null', () => {
    (useAtomValue as jest.Mock).mockReturnValue(null);
    const { container } = render(<CriticalButton />);
    expect(container).toBeEmptyDOMElement();
  });

  it('does not render when user ID does not match param ID', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ id: 456 });
    const { container } = render(<CriticalButton />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls router.push with the correct link when button is clicked', () => {
    render(<CriticalButton />);
    fireEvent.click(screen.getByText('profile.critical.button.reset'));
    expect(mockRouterPush).toHaveBeenCalledWith(expect.stringContaining('/profile/reset/123'));
  });
});
