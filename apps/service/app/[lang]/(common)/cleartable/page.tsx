import Card from '@/common/card/Card';
import { getClearTable } from '@/feature/cleartable/api/getClearTable';
import { getServerSession } from 'next-auth';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { GameType } from '@/common/game/data/GameType';
import ClearTableType from '@/feature/cleartable/component/ClearTable.type';
import ClearTable from '@/feature/cleartable/component/ClearTable.table';
import ClearTableChart from '@/feature/cleartable/component/ClearTable.chart';
import { getTranslations } from 'next-intl/server';

const PageClearTable = async (
    props: {
        searchParams: Promise<{ type: GameType; id: number }>;
    }
) => {
    const searchParams = await props.searchParams;
    const { type, id } = searchParams;
    const session = await getServerSession();
    const profile = await getProfileSession(session);
    const gameType = type || 'gf';
    const t = await getTranslations();

    if (!profile) {
        return null;
    }

    const data = await getClearTable({
        type: gameType,
        user: id || profile.id,
    });

    return (
        <Card title={`${t('cleartable')} (${gameType.toUpperCase()})`}>
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
