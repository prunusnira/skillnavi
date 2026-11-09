import Card from '@/common/card/Card';
import { getSnapshotList } from '@/feature/snapshot/api/getSnapshotList';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { SnapshotsList } from '@/feature/snapshot/component/SnapshotList';

const PageSnapshot = async () => {
    const user = await getProfileSession();
    if (!user) return null;

    const snapshotList = await getSnapshotList(user.id);
    const { gf, dm } = snapshotList;
    const gfMap = new Map<string, string>();
    const dmMap = new Map<string, string>();
    gf.forEach((item) => {
        gfMap.set(item[0]!, item[1]!);
    });
    dm.forEach((item) => {
        dmMap.set(item[0]!, item[1]!);
    });

    return (
        <Card title="Snapshot">
            <section
                className={'flex w-full flex-col gap-6 md:flex-row md:gap-10'}
            >
                <SnapshotsList type={'gf'} snapshotMap={gfMap} />
                <SnapshotsList type={'dm'} snapshotMap={dmMap} />
            </section>
        </Card>
    );
};

export default PageSnapshot;
