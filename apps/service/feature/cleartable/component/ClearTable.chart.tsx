'use client';

import { ClearTableResponse } from '@/feature/cleartable/data/ClearTable';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts';
import { useMemo } from 'react';
import {
    NameType,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <section className={'surface-muted flex flex-col gap-2 px-5 py-3'}>
                {payload.map((item, index) => (
                    <div
                        key={`${label}${index}`}
                        style={{ color: item.color }}
                    >
                        {item.name} {Number(item.value).toFixed(2)}%
                    </div>
                ))}
            </section>
        );
    }

    return null;
};

interface Props {
    tableData: ClearTableResponse[];
}

const ClearTableChart = ({ tableData }: Props) => {
    const data = useMemo(() => {
        return tableData.map((data) => ({
            level: data.level,
            SS: (data.ss / data.total) * 100,
            S: (data.s / data.total) * 100,
            A: (data.a / data.total) * 100,
            B: (data.b / data.total) * 100,
            C: (data.c / data.total) * 100,
        }));
    }, [tableData]);

    return (
        <section className={'w-full h-[400px]'}>
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="level"
                        label={'Level'}
                    />
                    <YAxis
                        max={100}
                        label={'(%)'}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar
                        dataKey="SS"
                        stackId="PlayData"
                        fill="#aaaa55"
                    />
                    <Bar
                        dataKey="S"
                        stackId="PlayData"
                        fill="#aa5555"
                    />
                    <Bar
                        dataKey="A"
                        stackId="PlayData"
                        fill="#aa55aa"
                    />
                    <Bar
                        dataKey="B"
                        stackId="PlayData"
                        fill="#55aa55"
                    />
                    <Bar
                        dataKey="C"
                        stackId="PlayData"
                        fill="#5555aa"
                    />
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
};

export default ClearTableChart;
