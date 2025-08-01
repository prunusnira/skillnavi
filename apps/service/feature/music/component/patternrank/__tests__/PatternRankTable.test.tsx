
import { render, screen } from '@testing-library/react';
import PatternRankTable from '../PatternRankTable';
import usePatternRankTable from '../usePatternRankTable';

jest.mock('../usePatternRankTable');

jest.mock('@/common/pager/Pager', () => {
  return function MockPager({ page, allpage }) {
    return <div data-testid="pager">Pager: {page}/{allpage}</div>;
  };
});

jest.mock('@/common/loading/Loading', () => {
  return function MockLoading() {
    return <div data-testid="loading">Loading...</div>;
  };
});

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('PatternRankTable', () => {
  beforeEach(() => {
    (usePatternRankTable as jest.Mock).mockReturnValue({
      rankTableData: [],
      pages: 1,
      isLoading: false,
    });
  });

  it('renders loading state when isLoading is true', () => {
    (usePatternRankTable as jest.Mock).mockReturnValue({
      rankTableData: [],
      pages: 1,
      isLoading: true,
    });
    render(<PatternRankTable page={1} level={100} />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('does not render when pages is null', () => {
    (usePatternRankTable as jest.Mock).mockReturnValue({
      rankTableData: [],
      pages: null,
      isLoading: false,
    });
    const { container } = render(<PatternRankTable page={1} level={100} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders rank table data and pager', () => {
    const mockRankTableData = [
      { name: 'User1', rate: 9500, icon: 'icon1' },
      { name: 'User2', rate: 8000, icon: 'icon2' },
    ];
    (usePatternRankTable as jest.Mock).mockReturnValue({
      rankTableData: mockRankTableData,
      pages: 5,
      isLoading: false,
    });
    render(<PatternRankTable page={1} level={100} />);

    expect(screen.getByText('User1')).toBeInTheDocument();
    expect(screen.getByText('User2')).toBeInTheDocument();
    expect(screen.getByText('95.00%')).toBeInTheDocument();
    expect(screen.getByText('80.00%')).toBeInTheDocument();
    expect(screen.getByText('Pager: 1/5')).toBeInTheDocument();

    // Check skill value calculation (level 100, rate 9500 -> skillValue = (9500 * 100) / 500 / 100 = 19)
    expect(screen.getByText('19')).toBeInTheDocument();
  });
});
