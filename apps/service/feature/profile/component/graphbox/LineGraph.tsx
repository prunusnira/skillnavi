import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    TooltipContentProps,
    XAxis,
    YAxis,
} from 'recharts';
import {
    NameType,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';
import dayjs from 'dayjs';

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipContentProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div className="flex min-w-36 flex-col gap-1 rounded-xl border border-slate-200 bg-white p-3 text-slate-800 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                <div className="mb-1 font-medium">
                    Date: {dayjs(label).format('YYYY-MM-DD')}
                </div>
                {payload.map((item) => (
                    <div
                        key={String(item.dataKey)}
                        className="flex justify-between gap-4"
                    >
                        <span style={{ color: item.color }}>{item.name}</span>
                        <span>{item.value}</span>
                    </div>
                ))}
            </div>
        );
    }

    return null;
};

interface Props {
    data: ProfileGraphRaw[];
    color: string;
    gfColor: string;
    dmColor: string;
}

const LineGraph = ({
    data,
    color,
    gfColor,
    dmColor,
}: Props) => {
    return (
        <div className="h-[280px] w-full sm:h-[360px]">
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        stroke={color}
                        interval="preserveStartEnd"
                        minTickGap={24}
                        tick={{ fontSize: 11 }}
                    />
                    <YAxis
                        domain={[0, 10000]}
                        stroke={color}
                        width={56}
                        tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                        cursor={true}
                        content={(props) => <CustomTooltip {...props} />}
                    />
                    <Line
                        name="GF"
                        type="monotone"
                        dataKey="gf"
                        stroke={gfColor}
                        strokeWidth={2.5}
                        dot={false}
                    />
                    <Line
                        name="DM"
                        type="monotone"
                        dataKey="dm"
                        stroke={dmColor}
                        strokeWidth={2.5}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineGraph;
