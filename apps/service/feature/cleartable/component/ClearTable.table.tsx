import { ClearTableResponse } from '@/feature/cleartable/data/ClearTable';
import style from './ClearTable.table.module.scss';
import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface Props {
    tableData: ClearTableResponse[];
}

const TableCell = ({
    children,
    isBold,
}: {
    children: ReactNode;
    isBold?: boolean;
}) => (
    <div className={clsx(style.tableCell, isBold && style.isBold)}>
        {children}
    </div>
);

const ClearTable = ({ tableData }: Props) => {
    return (
        <section className={style.table}>
            {/* 헤더 영역 */}
            <div className={clsx(style.tableRow, style.isHeader)}>
                <TableCell>Level</TableCell>
                <TableCell>SS</TableCell>
                <TableCell>S</TableCell>
                <TableCell>A</TableCell>
                <TableCell>B</TableCell>
                <TableCell>C</TableCell>
                <TableCell>Total</TableCell>
            </div>

            {/* 데이터 영역 */}
            {tableData.map((row) => {
                return (
                    <div
                        className={style.tableRow}
                        key={row.level}
                    >
                        <TableCell isBold={true}>
                            {(row.level / 100).toFixed(2)}
                        </TableCell>
                        <TableCell>{row.ss}</TableCell>
                        <TableCell>{row.s}</TableCell>
                        <TableCell>{row.a}</TableCell>
                        <TableCell>{row.b}</TableCell>
                        <TableCell>{row.c}</TableCell>
                        <TableCell>{row.total}</TableCell>
                    </div>
                );
            })}
        </section>
    );
};

export default ClearTable;
