
import { render, screen } from '@testing-library/react';
import LineGraph from '../LineGraph';
import { ProfileGraph } from '@/feature/profile/data/ProfileGraph';

jest.mock('recharts', () => ({
  ...jest.requireActual('recharts'),
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  LineChart: ({ children }) => <div>{children}</div>,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Line: () => <div data-testid="line" />,
}));

describe('LineGraph', () => {
  const mockData: ProfileGraph[] = [
    { date: '2023-01-01', value: 1000 },
    { date: '2023-01-02', value: 1050 },
  ];

  it('renders LineChart components with correct props', () => {
    render(<LineGraph type="gf" data={mockData} min={900} max={1100} color="black" />);

    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    expect(screen.getByTestId('line')).toBeInTheDocument();
  });

  it('does not render when min or max is undefined', () => {
    const { container } = render(<LineGraph type="gf" data={mockData} color="black" />);
    expect(container).toBeEmptyDOMElement();
  });
});
