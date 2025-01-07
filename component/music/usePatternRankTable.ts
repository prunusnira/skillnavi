import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getPatternRanking } from '@/module/api/music/getPatternRanking';
import { useMemo } from 'react';
import { getProfile } from '@/module/api/profile/getProfile';
import { PatternRankDisplay } from '@/data/music/PatternRankDisplay';
import { MUSICLIST_SIZE } from '@/data/env/constant';
import { convertRateToRank } from '@/module/util/convertRateToRank';
import { getPatternRankingPages } from '@/module/api/music/getPatternRankingPages';

const usePatternRankTable = () => {
    const searchParams = useSearchParams();

    const mid = Number(searchParams.get('mid'));
    const version = Number(searchParams.get('version'));
    const patterncode = Number(searchParams.get('ptcode'));
    const page = Number(searchParams.get('page'));

    // 랭크 데이터
    const { data: rankdata, isLoading } = useQuery({
        queryKey: [
            'pattern',
            'rank',
            mid,
            patterncode,
            version,
            page,
        ],
        queryFn: () => getPatternRanking({ mid, patterncode, version, page }),
    });

    // 랭크 사이즈
    const { data: pages } = useQuery({
        queryKey: [
            'pattern',
            'rank',
            mid,
            patterncode,
            version,
        ],
        queryFn: () => getPatternRankingPages({ mid, patterncode, version }),
    });

    // 유저 데이터
    const uids = useMemo(() => rankdata?.map((r) => r.uid), [rankdata]);
    const { data: userdata } = useQuery({
        queryKey: [
            'pattern',
            'user',
            uids,
        ],
        queryFn: () => getProfile(uids || []),
    });

    // 랭크 테이블에 들어가는 값
    /**
     * 순위, 이름, 달성률, 스킬, 랭크
     */
    const rankTableData = useMemo(() => {
        const displayData: PatternRankDisplay[] = [];
        rankdata?.forEach((rank, index) => {
            const { uid, rate, fc } = rank;

            // 랭크 데이터에서 확인한 사용자 아이디로 사용자 정보 획득
            const user = userdata?.find((u) => u.id === uid);

            if (user) {
                displayData.push({
                    position: (page - 1) * MUSICLIST_SIZE + index + 1,
                    icon: user.titletower,
                    name: user.name,
                    rate,
                    rank: convertRateToRank(rate),
                    fc: !!fc,
                });
            }
        });
        return displayData;
    }, [
        rankdata,
        userdata,
    ]);

    return { rankTableData, pages, isLoading };
};

export default usePatternRankTable;
