
import { render, screen, fireEvent } from '@testing-library/react';
import Pager from '../Pager';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

jest.mock('@/i18n/routing');
jest.mock('next/navigation');

jest.mock('@skillnavi/ui', () => ({
  ButtonRounded: ({ text, onClick }) => <button onClick={onClick}>{text}</button>,
}));

describe('Pager', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a single button when allpage is 0 or 1', () => {
    render(<Pager page={1} allpage={0} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);

    render(<Pager page={1} allpage={1} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  it('renders all pages when allpage is less than 8', () => {
    render(<Pager page={1} allpage={5} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('renders 1 to 5 and last page when current page is less than 4', () => {
    render(<Pager page={1} allpage={10} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('......')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(6); // 1-5 and 10
  });

  it('renders first page and last 5 pages when current page is near end', () => {
    render(<Pager page={8} allpage={10} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('......')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(6); // 1 and 6-10
  });

  it('renders first, middle, and last pages when current page is in middle', () => {
    render(<Pager page={5} allpage={10} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(2);
    expect(screen.getAllByRole('button')).toHaveLength(7); // 1, 3-7, 10
  });

  it('calls onPageClick with correct page number', () => {
    render(<Pager page={1} allpage={5} />);
    fireEvent.click(screen.getByText('3'));
    expect(mockRouterPush).toHaveBeenCalledWith('/test-path?page=3');
  });

  it('preserves other search params when changing page', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('type=gf&version=28'));
    render(<Pager page={1} allpage={5} />);
    fireEvent.click(screen.getByText('3'));
    expect(mockRouterPush).toHaveBeenCalledWith('/test-path?type=gf&version=28&page=3');
  });
});
