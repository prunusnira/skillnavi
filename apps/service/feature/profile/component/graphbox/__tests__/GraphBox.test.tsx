
import { render, screen } from '@testing-library/react';
import GraphBox from '../GraphBox';
import useGraph from '../useGraph';
import useTheme from '@/feature/header/option/useTheme';

jest.mock('../useGraph');
jest.mock('@/feature/header/option/useTheme');

jest.mock('../LineGraph', () => {
  return function MockLineGraph({ type, data, min, max, color }) {
    return (
      <div data-testid={`line-graph-${type}`}>
        Type: {type}, Data Length: {data.length}, Min: {min}, Max: {max}, Color: {color}
      </div>
    );
  };
});

describe('GraphBox', () => {
  const mockGraphData = [
    { date: '2023-01-01', skill: 1000, type: 'gf' },
    { date: '2023-01-01', skill: 500, type: 'dm' },
  ];

  beforeEach(() => {
    (useGraph as jest.Mock).mockReturnValue({
      gfdata: [{ date: '2023-01-01', skill: 1000 }],
      dmdata: [{ date: '2023-01-01', skill: 500 }],
      gfmin: 900,
      gfmax: 1100,
      dmmin: 400,
      dmmax: 600,
    });
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders two LineGraph components with correct props', () => {
    render(<GraphBox data={mockGraphData as any} />);

    expect(screen.getByTestId('line-graph-gf')).toBeInTheDocument();
    expect(screen.getByTestId('line-graph-gf')).toHaveTextContent('Type: gf, Data Length: 1, Min: 900, Max: 1100, Color: black');

    expect(screen.getByTestId('line-graph-dm')).toBeInTheDocument();
    expect(screen.getByTestId('line-graph-dm')).toHaveTextContent('Type: dm, Data Length: 1, Min: 400, Max: 600, Color: black');
  });

  it('passes white color to LineGraph in dark theme', () => {
    (useTheme as jest.Mock).mockReturnValue({ theme: 'dark' });
    render(<GraphBox data={mockGraphData as any} />);

    expect(screen.getByTestId('line-graph-gf')).toHaveTextContent('Color: white');
    expect(screen.getByTestId('line-graph-dm')).toHaveTextContent('Color: white');
  });
});
