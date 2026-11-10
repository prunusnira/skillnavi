'use client';

import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';
import LineGraph from '@/feature/profile/component/graphbox/LineGraph';
import { cn } from '@/lib/cn';
import useTheme from '@/feature/header/option/useTheme';

interface Props {
    data: ProfileGraphRaw[];
}

const GraphBox = ({ data }: Props) => {
    const { theme } = useTheme();

    const gfColor = '#2563eb';
    const dmColor = '#f97316';

    return (
        <section className={cn('w-full text-sm')}>
            {data.length > 0 && (
                <div className="mb-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2">
                        <span
                            aria-hidden="true"
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: gfColor }}
                        />
                        <span>GF</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            aria-hidden="true"
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: dmColor }}
                        />
                        <span>DM</span>
                    </div>
                </div>
            )}
            <LineGraph
                data={data}
                color={theme === 'dark' ? 'white' : 'black'}
                gfColor={gfColor}
                dmColor={dmColor}
            />
        </section>
    );
};

export default GraphBox;
