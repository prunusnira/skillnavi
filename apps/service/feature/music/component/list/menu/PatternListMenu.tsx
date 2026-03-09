'use client';

import { cn } from '@/lib/cn';
import { PatternMenuMusicVersion } from '@/feature/music/component/list/menu/PatternMenuMusicVersion';
import { PatternMenuGameVersion } from '@/feature/music/component/list/menu/PatternMenuGameVersion';
import { PatternMenuDifficulty } from '@/feature/music/component/list/menu/PatternMenuDifficulty';

interface Props {
    musicVersion: number;
    gameVersion: number;
}

export const PatternListMenu = ({ musicVersion, gameVersion }: Props) => {
    return (
        <section
            className={cn(
                'left-0 top-8 w-full md:w-768px flex-col-center',
                'p-5 transition-left',
            )}
        >
            {/* 곡 버전 설정 */}
            <PatternMenuMusicVersion musicVersion={musicVersion} />

            {/* 게임 버전 설정 */}
            <PatternMenuGameVersion
                musicVersion={musicVersion}
                gameVersion={gameVersion}
            />

            {/* 난이도 필터 */}
            <PatternMenuDifficulty />

            {/* 랭크 필터 */}
            {/*<PatternMenuRank />*/}
        </section>
    );
};
