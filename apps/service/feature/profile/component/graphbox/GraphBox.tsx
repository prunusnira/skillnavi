'use client';

import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';
import useGraph from '@/feature/profile/component/graphbox/useGraph';
import LineGraph from '@/feature/profile/component/graphbox/LineGraph';
import { cn } from '@/lib/cn';
import useTheme from '@/feature/header/option/useTheme';

interface Props {
    data: ProfileGraphRaw[];
}

const GraphBox = ({ data }: Props) => {
    const { gfdata, dmdata, gfmin, gfmax, dmmin, dmmax } = useGraph({ data });
    const { theme } = useTheme();
    return (
        <section className={cn('w-full text-sm')}>
            <LineGraph
                type="gf"
                data={gfdata}
                min={gfmin}
                max={gfmax}
                color={theme === 'dark' ? 'white' : 'black'}
            />
            <LineGraph
                type="dm"
                data={dmdata}
                min={dmmin}
                max={dmmax}
                color={theme === 'dark' ? 'white' : 'black'}
            />
        </section>
    );
};

export default GraphBox;
