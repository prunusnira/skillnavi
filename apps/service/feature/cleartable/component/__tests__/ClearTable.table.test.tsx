import { render, screen } from '@testing-library/react';
import ClearTable from '../ClearTable.table';
import { ClearTableResponse } from '@/feature/cleartable/data/ClearTable';

describe('ClearTable', () => {
    it('renders table with correct data', () => {
        const tableData: ClearTableResponse[] = [
            {
                level: 1000,
                total: 100,
                ss: 50,
                s: 20,
                a: 10,
                b: 10,
                c: 10,
            },
            {
                level: 1100,
                total: 50,
                ss: 25,
                s: 10,
                a: 5,
                b: 5,
                c: 5,
            },
        ];

        render(<ClearTable tableData={tableData} />);

        expect(screen.getByText('Level')).toBeInTheDocument();
        expect(screen.getByText('SS')).toBeInTheDocument();
        expect(screen.getByText('S')).toBeInTheDocument();
        expect(screen.getByText('A')).toBeInTheDocument();
        expect(screen.getByText('B')).toBeInTheDocument();
        expect(screen.getByText('C')).toBeInTheDocument();
        expect(screen.getByText('Total')).toBeInTheDocument();

        expect(screen.getByText('10.00')).toBeInTheDocument();
        expect(screen.getByText('11.00')).toBeInTheDocument();
    });
});
