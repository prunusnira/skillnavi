'use client';

import style from './MusicDiffTable.module.css';
import { Pattern } from '@/feature/music/data/Pattern';
import { cn } from '@/lib/cn';
import { useRouter } from '@/i18n/routing';
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
}

// CSR 난이도 테이블
const MusicDiffTable = ({ pattern, skill, mid, version }: Props) => {
    const router = useRouter();
    const user = useAtomValue(atomUser);

    return (
        <section
            className={style.musicBox}
            onClick={() => {
                if (user) {
                    router.push(
                        LINK_MUSIC_INFO({
                            uid: user.id,
                            mid,
                            version,
                        }),
                    );
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
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={1}
                    />
                </div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={5}
                    />
                </div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={9}
                    />
                </div>
            </section>
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}>ADV</div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={2}
                    />
                </div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={6}
                    />
                </div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={10}
                    />
                </div>
            </section>
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}>EXT</div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={3}
                    />
                </div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={7}
                    />
                </div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={11}
                    />
                </div>
            </section>
            <section className={style.musicRow}>
                <div className={cn(style.musicCell, style.titleCell)}>MAS</div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={4}
                    />
                </div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={8}
                    />
                </div>
                <div className={cn(style.musicCell, style.levelCell, 'link')}>
                    <MusicCell
                        pattern={pattern}
                        skill={skill}
                        patterncode={12}
                    />
                </div>
            </section>
        </section>
    );
};

export default MusicDiffTable;
