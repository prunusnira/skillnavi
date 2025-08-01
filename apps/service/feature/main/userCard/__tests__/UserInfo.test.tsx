
import { render, screen } from '@testing-library/react';
import UserInfo from '../UserInfo';
import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { getTranslations } from 'next-intl/server';

jest.mock('next-auth');
jest.mock('@/feature/profile/api/getProfileSession');
jest.mock('next-intl/server');

jest.mock('@/feature/main/userCard/UserButton', () => {
  return function MockUserButton() {
    return <div data-testid="user-button">Mock User Button</div>;
  };
});

jest.mock('@/feature/profile/component/UserBox', () => {
  return function MockUserBox({ mydata }) {
    return <div data-testid="user-box">Mock User Box: {mydata.name}</div>;
  };
});

jest.mock('@/feature/main/userCard/UserScript', () => {
  return function MockUserScript({ unique }) {
    return <div data-testid="user-script">Mock User Script: {unique}</div>;
  };
});

describe('UserInfo', () => {
  beforeEach(() => {
    (getServerSession as jest.Mock).mockResolvedValue({});
    (getTranslations as jest.Mock).mockResolvedValue((key) => key);
  });

  it('renders user info when mydata exists', async () => {
    const mockMyData = { unique_id: '123', name: 'Test User' };
    (getProfileSession as jest.Mock).mockResolvedValue(mockMyData);

    render(await UserInfo());

    expect(screen.getByTestId('user-box')).toHaveTextContent('Mock User Box: Test User');
    expect(screen.getByTestId('user-button')).toBeInTheDocument();
    expect(screen.getByText('main.user.script.title')).toBeInTheDocument();
    expect(screen.getByTestId('user-script')).toHaveTextContent('Mock User Script: 123');
  });

  it('does not render when mydata is null', async () => {
    (getProfileSession as jest.Mock).mockResolvedValue(null);

    const { container } = render(await UserInfo());

    expect(container).toBeEmptyDOMElement();
  });
});
