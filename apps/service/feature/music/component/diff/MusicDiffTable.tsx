'use client';

import style from './MusicDiffTable.module.css';
import { Pattern } from '@/feature/music/data/Pattern';
import { cn } from '@/lib/cn';
import PatternTag from '@/common/pattern/PatternTag';
import { Link } from '@/i18n/routing';
import { LINK_MUSIC_INFO } from '@/url/url';
import { useAtomValue } from 'jotai';
import { atomUser } from '@/feature/profile/data/atomUser';
import { Skill } from '@/feature/skill/data/Skill';
import { MusicCell } from '@/feature/music/component/diff/MusicCell';

interface Props {
    pattern: Pattern[];
    skill?: Skill[];
    mid: number;
    version: number;
    uid?: number;
}

// CSR 난이도 테이블
const MusicDiffTable = ({ pattern, skill, mid, version, uid }: Props) => {
    const user = useAtomValue(atomUser);
    const userId = uid ?? user?.id;
    const renderPatternCell = (patterncode: number) => {
        const cellClassName = cn(style.musicCell, style.levelCell);
        const cellContent = (
            <MusicCell
                pattern={pattern}
                skill={skill}
                patterncode={patterncode}
            />
        );
        const hasPattern = pattern.some(
            (item) =>
                item.patterncode === patterncode && item.level > 0,
        );

        if (!hasPattern) {
            return <div className={cellClassName}>{cellContent}</div>;
        }

        return (
            <Link
                className={cn(cellClassName, 'link')}
                href={LINK_MUSIC_INFO({
                    uid: userId,
                    mid,
                    version,
                    ptcode: patterncode,
                })}
            >
                {cellContent}
            </Link>
        );
    };

    return (
        <section className={style.musicBox}>
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}></div>
                <div className={cn(style.musicCell, style.titleCell)}>G</div>
                <div className={cn(style.musicCell, style.titleCell)}>B</div>
                <div className={cn(style.musicCell, style.titleCell)}>D</div>
            </section>
            <section className={style.musicRow}>
                <div className={style.musicCell}>
                    <PatternTag patternCode={1} showInstrument={false} />
                </div>
                {renderPatternCell(1)}
                {renderPatternCell(5)}
                {renderPatternCell(9)}
            </section>
            <section className={style.musicRow}>
                <div className={style.musicCell}>
                    <PatternTag patternCode={2} showInstrument={false} />
                </div>
                {renderPatternCell(2)}
                {renderPatternCell(6)}
                {renderPatternCell(10)}
            </section>
            <section className={style.musicRow}>
                <div className={style.musicCell}>
                    <PatternTag patternCode={3} showInstrument={false} />
                </div>
                {renderPatternCell(3)}
                {renderPatternCell(7)}
                {renderPatternCell(11)}
            </section>
            <section className={style.musicRow}>
                <div className={style.musicCell}>
                    <PatternTag patternCode={4} showInstrument={false} />
                </div>
                {renderPatternCell(4)}
                {renderPatternCell(8)}
                {renderPatternCell(12)}
            </section>
        </section>
    );
};

export default MusicDiffTable;
