import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getMusicRecord } from '@/module/api/music/getMusicRecord';
import { usePathname, useRouter } from '@/i18n/routing';
import { getMusicInfo } from '@/module/api/music/getMusicInfo';
import { GameMode } from '@/data/game/GameMode';
import { useMemo, useState } from 'react';
import { Skill } from '@/data/skill/Skill';
import { getMusicPattern } from '@/module/api/music/getMusicPattern';

const useMusicRecord = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [
        gameMode,
        setGameMode,
    ] = useState<GameMode>('g');

    const uid = searchParams.get('uid');
    const mid = searchParams.get('mid');
    const version = searchParams.get('version');

    const getMusic = async () => {
        if (!mid) return undefined;
        const info = await getMusicInfo({ mid: Number(mid) });
        const pattern = await getMusicPattern({
            mid: Number(mid),
            version: Number(version),
        });
        return {
            info,
            pattern,
        };
    };

    const getRecord = () => {
        if (!uid || !mid || !version) {
            return undefined;
        }
        return getMusicRecord({
            mid: Number(mid),
            uid: Number(uid),
            version: Number(version),
        });
    };

    const { data: music } = useQuery({
        queryKey: [
            'music',
            mid,
        ],
        queryFn: getMusic,
    });

    const { data: skill } = useQuery({
        queryKey: [
            'skill',
            mid,
            uid,
            version,
        ],
        queryFn: getRecord,
    });

    const skillDisplay = useMemo(() => {
        const list: Skill[] = [];
        if (skill && gameMode === 'g') {
            skill.forEach((x) => {
                if (x.patterncode < 5) {
                    list.push(x);
                }
            });
        }
        if (skill && gameMode === 'b') {
            skill.map((x) => {
                if (x.patterncode >= 5 && x.patterncode < 9) {
                    list.push(x);
                }
            });
        }
        if (skill && gameMode === 'd') {
            skill.map((x) => {
                if (x.patterncode >= 9) {
                    list.push(x);
                }
            });
        }
        return list;
    }, [gameMode]);

    // 데이터 업데이트
    const changeVersion = (nextver: number) => {
        const nextParams = new URLSearchParams();
        nextParams.set('uid', String(uid));
        nextParams.set('mid', String(mid));
        nextParams.set('version', String(nextver));
        router.push(`${pathname}?${nextParams.toString()}`);
    };

    return {
        gameMode,
        changeGameType: setGameMode,
        changeVersion,
        music,
        skill: skillDisplay,
    };
};

export default useMusicRecord;
