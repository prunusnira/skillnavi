import Card from '@/common/card/Card';
import { getClearTable } from '@/feature/cleartable/api/getClearTable';
import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { GameType } from '@/common/game/data/GameType';
import ClearTableType from '@/feature/cleartable/component/ClearTable.type';
import ClearTable from '@/feature/cleartable/component/ClearTable.table';
import ClearTableChart from '@/feature/cleartable/component/ClearTable.chart';

const PageClearTable = async ({
    searchParams,
}: {
    searchParams: { page: number; type: GameType };
}) => {
    const session = await getServerSession();
    const profile = await getProfileSession(session);
    const { type } = searchParams;

    if (!profile) {
        return null;
    }

    const data = await getClearTable({ type, user: profile.id });

    return (
        <Card title={`Clear Table (${type.toUpperCase()})`}>
            {/* 타입변경 */}
            <ClearTableType />

            {/* 표 */}
            <ClearTable tableData={data} />

            {/* 그래프 */}
            <ClearTableChart tableData={data} />
        </Card>
    );
};

export default PageClearTable;
