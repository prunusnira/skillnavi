import Card from '@/common/card/Card';
import { getClearTable } from '@/feature/cleartable/api/getClearTable';
import { getProfileSession } from '@/feature/profile/api/getProfileSession';
import { GameType } from '@/common/game/data/GameType';
import ClearTableOption from '@/feature/cleartable/component/ClearTableOption';
import ClearTable from '@/feature/cleartable/component/ClearTable.table';
import ClearTableChart from '@/feature/cleartable/component/ClearTable.chart';
import { getTranslations } from 'next-intl/server';

const PageClearTable = async (props: {
    searchParams: Promise<{ type: GameType; id: number; version: number }>;
}) => {
    const searchParams = await props.searchParams;
    const { type, id, version } = searchParams;
    const profile = await getProfileSession();
    const gameType = type || 'gf';
    const t = await getTranslations();

    if (!profile) {
        return null;
    }

    const data = await getClearTable({
        type: gameType,
        user: id || profile.id,
        version,
    });

    return (
        <Card title={`${t('cleartable')} (${gameType.toUpperCase()})`}>
            {/* 옵션변경 */}
            <ClearTableOption />

            {/* 그래프 */}
            <ClearTableChart tableData={data} />

            {/* 표 */}
            <ClearTable tableData={data} />
        </Card>
    );
};

export default PageClearTable;
