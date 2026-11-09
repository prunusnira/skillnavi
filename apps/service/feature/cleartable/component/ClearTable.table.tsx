import { ClearTableResponse } from '@/feature/cleartable/data/ClearTable';
import style from './ClearTable.table.module.css';
import { ReactNode } from 'react';
import { clsx } from 'clsx';
import RankTag from '@/common/rank/RankTag';

interface Props {
    tableData: ClearTableResponse[];
}

const TableCell = ({
    children,
    isBold,
    isTotal,
}: {
    children: ReactNode;
    isBold?: boolean;
    isTotal?: boolean;
}) => (
    <div
        className={clsx(
            style.tableCell,
            isBold && style.isBold,
            isTotal && style.isTotal,
        )}
    >
        {children}
    </div>
);

const ClearTable = ({ tableData }: Props) => {
    return (
        <div className={style.tableViewport}>
            <section className={style.table}>
                {/* 헤더 영역 */}
                <div className={clsx(style.tableRow, style.isHeader)}>
                    <TableCell>Level</TableCell>
                    <TableCell>
                        <RankTag rank="SS" rate={0} />
                    </TableCell>
                    <TableCell>
                        <RankTag rank="S" rate={0} />
                    </TableCell>
                    <TableCell>
                        <RankTag rank="A" rate={0} />
                    </TableCell>
                    <TableCell>
                        <RankTag rank="B" rate={0} />
                    </TableCell>
                    <TableCell>
                        <RankTag rank="C" rate={0} />
                    </TableCell>
                    <TableCell>Total</TableCell>
                </div>

                {/* 데이터 영역 */}
                {tableData.map((row, index) => (
                    <div
                        className={clsx(
                            style.tableRow,
                            style.dataRow,
                            index % 2 === 1 && style.isAlternate,
                        )}
                        key={row.level}
                    >
                        <TableCell isBold>
                            {(row.level / 100).toFixed(2)}
                        </TableCell>
                        <TableCell>{row.ss}</TableCell>
                        <TableCell>{row.s}</TableCell>
                        <TableCell>{row.a}</TableCell>
                        <TableCell>{row.b}</TableCell>
                        <TableCell>{row.c}</TableCell>
                        <TableCell isTotal>{row.total}</TableCell>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default ClearTable;
