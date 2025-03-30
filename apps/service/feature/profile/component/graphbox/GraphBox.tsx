'use client';

import { ProfileGraphRaw } from '@/feature/profile/data/ProfileGraph';
import useGraph from '@/feature/profile/component/graphbox/useGraph';
import LineGraph from '@/feature/profile/component/graphbox/LineGraph';
import { cn } from '@/lib/cn';

interface Props {
    data: ProfileGraphRaw[];
}

const GraphBox = ({ data }: Props) => {
    const { gfdata, dmdata, gfmin, gfmax, dmmin, dmmax } = useGraph({ data });
    return (
        <section className={cn('w-full text-sm')}>
            <LineGraph
                type="gf"
                data={gfdata}
                min={gfmin}
                max={gfmax}
            />
            <LineGraph
                type="dm"
                data={dmdata}
                min={dmmin}
                max={dmmax}
            />
        </section>
    );
};

export default GraphBox;
