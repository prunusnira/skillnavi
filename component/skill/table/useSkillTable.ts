import { useParams, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSkillTable } from '@/module/api/skill/getSkillTable';
import { getProfile } from '@/module/api/profile/getProfile';
import { useEffect, useMemo } from 'react';
import { TableType } from '@/data/skill/TableType';
import { TableDataType } from '@/data/skill/TableDataType';
import { GameType } from '@/data/game/GameType';
import { useAtomValue, useSetAtom } from 'jotai';
import {
    atomSkillTableOptions,
    atomSkillTableOptionsInit,
} from '@/jotai/atomSkillTableOptions';
import { OrderType } from '@/data/skill/OrderType';

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

    const getSkill = async ({
        isHot = false,
        isOthers = false,
    }: {
        isHot?: boolean;
        isOthers?: boolean;
    }) => {
        return await getSkillTable({
            id: params.id,
            page: option.page,
            game: option.game,
            version: option.versionId,
            order: option.order,
            pageType: option.data,
            isHot,
            isOthers,
        });
    };

    // 전체 목록 스킬 데이터
    const { data: skillall, isLoading: isLoadingAll } = useQuery({
        queryKey: [
            'skillall',
            option,
        ],
        queryFn: () => getSkill({}),
    });

    // 스킬대상곡 (HOT)
    const { data: skillhot, isLoading: isLoadingHot } = useQuery({
        queryKey: [
            'skillhot',
            option,
        ],
        queryFn: () => getSkill({ isHot: true }),
    });

    // 스킬대상곡 (OTHER)
    const { data: skillother, isLoading: isLoadingOther } = useQuery({
        queryKey: [
            'skillother',
            option,
        ],
        queryFn: () => getSkill({ isOthers: true }),
    });

    const hotvalue = useMemo(() => {
        if (!skillhot?.length) return 0;

        let sum = 0;
        skillhot.forEach((skill) => {
            sum += Math.floor(skill.skill / 10000);
        });
        return sum;
    }, [skillhot]);

    const othervalue = useMemo(() => {
        if (!skillother?.length) return 0;

        let sum = 0;
        skillother.forEach((skill) => {
            sum += Math.floor(skill.skill / 10000);
        });
        return sum;
    }, [skillother]);

    // 프로필 정보
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => getProfile(params.id),
    });

    const skill = useMemo(() => {
        if (!profile?.profile) return undefined;
        const version = Number(searchParams.get('version') || 0);
        switch (version) {
            case 24:
                return {
                    all: profile.profile.gskilltb + profile.profile.dskilltb,
                    gf: profile.profile.gskilltb,
                    dm: profile.profile.dskilltb,
                };
            case 25:
                return {
                    all:
                        profile.profile.gskilltbre + profile.profile.dskilltbre,
                    gf: profile.profile.gskilltbre,
                    dm: profile.profile.dskilltbre,
                };
            case 26:
                return {
                    all: profile.profile.gskillmx + profile.profile.dskillmx,
                    gf: profile.profile.gskillmx,
                    dm: profile.profile.dskillmx,
                };
            case 27:
                return {
                    all: profile.profile.gskillex + profile.profile.dskillex,
                    gf: profile.profile.gskillex,
                    dm: profile.profile.dskillex,
                };
            case 28:
                return {
                    all: profile.profile.gskillnx + profile.profile.dskillnx,
                    gf: profile.profile.gskillnx,
                    dm: profile.profile.dskillnx,
                };
            case 29:
                return {
                    all: profile.profile.gskillhv + profile.profile.dskillhv,
                    gf: profile.profile.gskillhv,
                    dm: profile.profile.dskillhv,
                };
            case 30:
                return {
                    all: profile.profile.gskillfu + profile.profile.dskillfu,
                    gf: profile.profile.gskillfu,
                    dm: profile.profile.dskillfu,
                };
            case 31:
            default:
                return {
                    all: profile.profile.gskill + profile.profile.dskill,
                    gf: profile.profile.gskill,
                    dm: profile.profile.dskill,
                };
        }
    }, [
        profile,
        searchParams,
    ]);

    return {
        skillall,
        skillhot,
        skillother,
        profile: profile?.profile,
        hotvalue,
        othervalue,
        isLoadingAll,
        isLoadingHot,
        isLoadingOther,
        skill,
    };
};

export default useSkillTable;
