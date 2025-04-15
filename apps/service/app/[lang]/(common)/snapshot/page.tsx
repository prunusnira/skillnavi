import Card from '@/common/card/Card';
import { getSnapshotList } from '@/feature/snapshot/api/getSnapshotList';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { getServerSession } from 'next-auth';
import { SnapshotsList } from '@/feature/snapshot/component/SnapshotList';

const PageSnapshot = async () => {
    const user = await getProfileSession(await getServerSession());
    if (!user) return null;

    const snapshotList = await getSnapshotList(user.id);
    const { gf, dm } = snapshotList;
    const gfMap = new Map<string, string>();
    const dmMap = new Map<string, string>();
    gf.forEach(item => {
        gfMap.set(item[0]!, item[1]!);
    });
    dm.forEach(item => {
        dmMap.set(item[0]!, item[1]!);
    });

    return <Card title="Snapshot">
        <section className={'flex flex-col md:flex-row gap-[20px] md:gap-[40px]'}>
            <SnapshotsList type={'gf'} snapshotMap={gfMap} />
            <SnapshotsList type={'dm'} snapshotMap={dmMap} />
        </section>
    </Card>;
};

export default PageSnapshot;
