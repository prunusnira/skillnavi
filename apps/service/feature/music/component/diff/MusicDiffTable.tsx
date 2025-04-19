'use client';

import style from './MusicDiffTable.module.scss';
import { Pattern } from '@/feature/music/data/Pattern';
import { useCallback } from 'react';
import { cn } from '@/lib/cn';
import { useRouter } from '@/i18n/routing';
import { LINK_MUSIC_INFO } from '@/url/url';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';

interface Props {
    pattern: Pattern[];
    mid: number;
    version: number;
}

// CSR 난이도 테이블
const MusicDiffTable = ({ pattern, mid, version }: Props) => {
    const router = useRouter();
    const user = useAtomValue(atomUser);
    const getLevel = useCallback(
        (ptcode: number) => {
            const level = pattern.find((p) => p.patterncode === ptcode)?.level;
            return level ? level / 100 : undefined;
        },
        [pattern],
    );

    return (
        <section
            className={style.musicBox}
            onClick={() => {
                if (user) {
                    router.push(LINK_MUSIC_INFO({
                        uid: user.id,
                        mid,
                        version,
                    }));
                }
            }}
        >
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}></div>
                <div className={cn(style.musicCell, style.titleCell)}>G</div>
                <div className={cn(style.musicCell, style.titleCell)}>B</div>
                <div className={cn(style.musicCell, style.titleCell)}>D</div>
            </section>
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}>BSC</div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(1)?.toFixed(2)}
                </div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(5)?.toFixed(2)}
                </div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(9)?.toFixed(2)}
                </div>
            </section>
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}>ADV</div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(2)?.toFixed(2)}
                </div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(6)?.toFixed(2)}
                </div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(10)?.toFixed(2)}
                </div>
            </section>
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}>EXT</div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(3)?.toFixed(2)}
                </div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(7)?.toFixed(2)}
                </div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(11)?.toFixed(2)}
                </div>
            </section>
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}>MAS</div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(4)?.toFixed(2)}
                </div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(8)?.toFixed(2)}
                </div>
                <div className={cn(style.musicCell, 'link')}>
                    {getLevel(12)?.toFixed(2)}
                </div>
            </section>
        </section>
    );
};

export default MusicDiffTable;
