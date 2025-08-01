
import { render, screen, fireEvent } from '@testing-library/react';
import Option from '../Option';
import { useAtomValue } from 'jotai';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { useLocale } from 'next-intl';
import useTheme from '../useTheme';

jest.mock('jotai');
jest.mock('next/navigation');
jest.mock('next-intl');
jest.mock('../useTheme');

describe('Option', () => {
  beforeEach(() => {
    (useAtomValue as jest.Mock).mockReturnValue({ option: true });
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useParams as jest.Mock).mockReturnValue({});
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (useLocale as jest.Mock).mockReturnValue('en');
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light', changeTheme: jest.fn() });
  });

  it('renders theme and language options when env.option is true', () => {
    render(<Option />);
    expect(screen.getByText('Dark')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
  });

  it('does not render when env.option is false', () => {
    (useAtomValue as jest.Mock).mockReturnValue({ option: false });
    const { container } = render(<Option />);
    expect(container).toBeEmptyDOMElement();
  });

  it('calls changeTheme with correct value when toggle is clicked', () => {
    const mockChangeTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light', changeTheme: mockChangeTheme });
    render(<Option />);
    fireEvent.click(screen.getByLabelText('toggle-theme'));
    expect(mockChangeTheme).toHaveBeenCalledWith('dark');
  });

  it('calls router.push with correct locale when language is changed', () => {
    const mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    render(<Option />);
    fireEvent.change(screen.getByDisplayValue('English'), { target: { value: 'ko' } });
    expect(mockRouterPush).toHaveBeenCalledWith({ pathname: '/test-path', params: {} }, { locale: 'ko' });
  });
});
