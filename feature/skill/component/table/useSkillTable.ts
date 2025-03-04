import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSkillTable } from '@/feature/skill/api/getSkillTable';
import { getProfile } from '@/feature/profile/api/getProfile';
import { useEffect, useMemo } from 'react';
import { TableType } from '@/feature/skill/data/TableType';
import { TableDataType } from '@/feature/skill/data/TableDataType';
import { GameType } from '@/common/game/data/GameType';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    atomSkillTableOptions,
    atomSkillTableOptionsInit,
} from '@/feature/skill/data/atomSkillTableOptions';
import { OrderType } from '@/feature/skill/data/OrderType';
import { getProfileSkill } from '@/feature/profile/api/getProfileSkill';

const useSkillTable = () => {
    const searchParams = useSearchParams();
    const params = useParams<{ id: string }>();
    const setInit = useSetAtom(atomSkillTableOptionsInit);
    const option = useAtomValue(atomSkillTableOptions);

    useEffect(() => {
        setInit({
            versionId: Number(searchParams.get('version') || 0),
            table: (searchParams.get('display') as TableType) || 'grid',
            data: (searchParams.get('pageType') as TableDataType) || 'target',
            page: Number(searchParams.get('page') || 1),
            game: (searchParams.get('game') as GameType) || 'gf',
            order: (searchParams.get('order') as OrderType) || undefined,
        });
    }, [searchParams]);

    const getSkill = async () => {
        return await getSkillTable({
            id: params.id,
            page: option.page,
            game: option.game,
            version: option.versionId,
            order: option.order,
            pageType: option.data,
        });
    };

    // 전체 목록 스킬 데이터
    const { data: result, isLoading } = useQuery({
        queryKey: [
            option,
        ],
        queryFn: getSkill,
    });

    const pages = useMemo(() => result?.pages, [result]);
    const skill = useMemo(() => result?.data, [result]);

    const skillSum = useMemo(() => {
        const sum: number[] = [];
        skill?.forEach((table) => {
            const skillSum = table.reduce(
                (acc, cur) =>
                    Math.floor((cur.rate * cur.level * 20) / 10000) + acc,
                0,
            );
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

    return {
        userSkill,
        skillSum,
        profile: profile?.[0],
        skill,
        isLoading,
        pages,
    };
};

export default useSkillTable;
