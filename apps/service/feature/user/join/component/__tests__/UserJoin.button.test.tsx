
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserJoinButton } from '../UserJoin.button';
import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';\
import { useRouter } from '@/i18n/routing';
import { sha256 } from 'js-sha256';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('next-intl');
jest.mock('next-auth/react');
jest.mock('@tanstack/react-query');
jest.mock('@/feature/user/join/api/createAccount');
jest.mock('@/i18n/routing');
jest.mock('js-sha256');

jest.mock('@skillnavi/ui', () => ({
  ButtonStandard: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

describe('UserJoinButton', () => {
  const mockRouterPush = jest.fn();
  const mockSignOut = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key) => key);
    (useSession as jest.Mock).mockReturnValue({ data: { user: { email: 'test@example.com' } } });
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (signOut as jest.Mock).mockImplementation(mockSignOut);
    (sha256 as jest.Mock).mockReturnValue('mock-sha256-token');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign up and decline buttons', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserJoinButton />
      </QueryClientProvider>
    );

    expect(screen.getByText('user.join.btnsign')).toBeInTheDocument();
    expect(screen.getByText('user.join.btndecline')).toBeInTheDocument();
  });

  it('calls mutate with correct token on sign up button click', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserJoinButton />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText('user.join.btnsign'));

    expect(sha256).toHaveBeenCalledWith('test');
    expect(mockMutate).toHaveBeenCalledWith({
      token: 'mock-sha256-token',
    });
  });

  it('redirects to main page on successful account creation', async () => {
    (useMutation as jest.Mock).mockImplementation((options) => ({
      mutate: (variables) => {
        options.onSuccess();
      },
    }));

    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserJoinButton />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText('user.join.btnsign'));

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/');
    });
  });

  it('calls signOut on decline button click', () => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <UserJoinButton />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText('user.join.btndecline'));

    expect(mockSignOut).toHaveBeenCalledWith({ callbackUrl: '/' });
  });
});
