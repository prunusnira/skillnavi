'use client';

import { ProfileGraphRaw } from '@/data/profile/ProfileGraph';
import useGraph from '@/component/profile/graphbox/useGraph';
import LineGraph from '@/component/profile/graphbox/LineGraph';
import { cn } from '@/module/util/cn';

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
