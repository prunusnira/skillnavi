import style from './MusicDiffTable.module.scss';
import { Pattern } from '@/data/pattern/Pattern';
import { useCallback } from 'react';
import { cn } from '@/module/util/cn';

interface Props {
    pattern: Pattern[];
}

const MusicDiffTable = ({ pattern }: Props) => {
    const getLevel = useCallback(
        (ptcode: number) => {
            const level = pattern.find((p) => p.patterncode === ptcode)?.level;
            return level ? level / 100 : undefined;
        },
        [pattern],
    );

    return (
        <section className={style.musicBox}>
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
