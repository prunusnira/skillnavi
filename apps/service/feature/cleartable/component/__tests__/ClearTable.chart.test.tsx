import { render, screen } from '@testing-library/react';
import ClearTableChart from '../ClearTable.chart';
import { ClearTableResponse } from '@/feature/cleartable/data/ClearTable';
import { ReactNode } from 'react';

jest.mock('recharts', () => ({
    ...jest.requireActual('recharts'),
    ResponsiveContainer: ({ children }: { children: ReactNode }) => (
        <div>{children}</div>
    ),
    BarChart: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    Bar: ({ dataKey }: { dataKey: string }) => (
        <div data-testid={`bar-${dataKey}`} />
    ),
}));

describe('ClearTableChart', () => {
    it('renders chart with correct data', () => {
        const tableData: ClearTableResponse[] = [
            {
                level: 10,
                total: 100,
                ss: 50,
                s: 20,
                a: 10,
                b: 10,
                c: 10,
            },
        ];

        render(<ClearTableChart tableData={tableData} />);

        expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
        expect(screen.getByTestId('x-axis')).toBeInTheDocument();
        expect(screen.getByTestId('y-axis')).toBeInTheDocument();
        expect(screen.getByTestId('tooltip')).toBeInTheDocument();
        expect(screen.getByTestId('legend')).toBeInTheDocument();
        expect(screen.getByTestId('bar-SS')).toBeInTheDocument();
        expect(screen.getByTestId('bar-S')).toBeInTheDocument();
        expect(screen.getByTestId('bar-A')).toBeInTheDocument();
        expect(screen.getByTestId('bar-B')).toBeInTheDocument();
        expect(screen.getByTestId('bar-C')).toBeInTheDocument();
    });
});
