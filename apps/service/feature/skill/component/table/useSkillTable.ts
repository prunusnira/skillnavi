import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSkillTable } from '@/feature/skill/api/getSkillTable';
import { getProfile } from '@/feature/profile/api/getProfile';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { TableDataType } from '@/feature/skill/data/TableDataType';
import { GameType } from '@/common/game/data/GameType';
import { OrderType } from '@/feature/skill/data/OrderType';
import { getProfileSkill } from '@/feature/profile/api/getProfileSkill';
import { TableType } from '@/feature/skill/data/TableType';

const useSkillTable = () => {
    const searchParams = useSearchParams();
    const params = useParams<{ id: string }>();

    const { page, game, version, display, pageType } = useMemo(
        () => ({
            page: Number(searchParams.get('page') || 1),
            game: (searchParams.get('game') as GameType) || 'gf',
            version: Number(searchParams.get('version') || 0),
            display: (searchParams.get('display') as TableType) || 'grid',
            pageType:
                (searchParams.get('pageType') as TableDataType) || 'target',
        }),
        [searchParams],
    );

    const getSkill = useCallback(async () => {
        return await getSkillTable({
            id: params.id,
            page: Number(searchParams.get('page') || 1),
            game: (searchParams.get('game') as GameType) || 'gf',
            version: Number(searchParams.get('version') || 0),
            order: (searchParams.get('order') as OrderType) || undefined,
            pageType:
                (searchParams.get('pageType') as TableDataType) || 'target',
        });
    }, [searchParams]);

    // 전체 목록 스킬 데이터
    const {
        data: result,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: [
            'skill',
            searchParams,
        ],
        queryFn: getSkill,
    });

    const pages = useMemo(() => result?.pages, [result]);
    const skill = useMemo(() => result?.data, [result]);

    const skillSum = useMemo(() => {
        const sum: number[] = [];
        skill?.forEach((table) => {
            const skillSum = table.data.reduce((acc, cur) => {
                return cur.skill + acc;
            }, 0);
            sum.push(skillSum);
        });
        return sum;
    }, [skill]);

    // 프로필 정보
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile([Number(params.id)]),
    });

    const { data: profileSkill } = useQuery({
        queryKey: ['profileSkill'],
        queryFn: () => getProfileSkill([Number(params.id)]),
    });

    const userSkill = useMemo(() => {
        if (!profile?.length) return undefined;
        if (!profileSkill?.length) return undefined;
        const version = Number(searchParams.get('version') || 0);
        const skill = profileSkill.find((ps) => ps.version === version);

        if (!skill) return undefined;

        return {
            all: skill.dskill + skill.gskill,
            gf: skill.gskill,
            dm: skill.dskill,
        };
    }, [
        profile,
        profileSkill,
        searchParams,
    ]);

    // Skill menu에 의하여 searchParams가 변경된 경우 데이터를 새로 가져오도록 처리
    useEffect(() => {
        refetch();
    }, [searchParams]);

    const ref = useRef<HTMLDivElement | null>(null);

    return {
        userSkill,
        skillSum,
        profile: profile?.[0],
        skill,
        isLoading,
        pages,

        page,
        game,
        version,
        display,
        pageType,
        ref,
    };
};

export default useSkillTable;
