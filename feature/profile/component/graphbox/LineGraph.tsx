import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts';
import {
    NameType,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { ProfileGraph } from '@/feature/profile/data/ProfileGraph';
import { cn } from '@/lib/cn';
import dayjs from 'dayjs';

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        return (
            <div
                className={cn(
                    'flex-col-center bg-white border-black border border-solid p-2',
                )}
            >
                <div>Date: {dayjs(label).format('YYYY-MM-DD')}</div>
                <div>Skill: {`${payload[0].value}`}</div>
            </div>
        );
    }

    return null;
};

interface Props {
    type: string;
    data: ProfileGraph[];
    min?: number;
    max?: number;
}

const LineGraph = ({ type, data, min, max }: Props) => {
    if (min === undefined || max === undefined) {
        return null;
    }

    return (
        <ResponsiveContainer
            width="100%"
            height={200}
        >
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="date"
                    stroke={'black'}
                />
                <YAxis
                    domain={[
                        min,
                        max,
                    ]}
                    stroke={'black'}
                />
                <Tooltip
                    cursor={true}
                    content={<CustomTooltip />}
                />
                <Line
                    name={type}
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LineGraph;
