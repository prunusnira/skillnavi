'use client';

import useMusicRecord from '@/component/music/useMusicRecord';
import { cn } from '@/module/util/cn';
import ButtonStandard from '@/component/common/button/ButtonStandard';
import ButtonRounded from '@/component/common/button/ButtonRounded';
import MusicRecordItem from '@/component/music/MusicRecordItem';

const MusicRecord = () => {
    const { music, skill, changeGameType, changeVersion } = useMusicRecord();

    return (
        <section className={cn('w-full')}>
            {/* 메뉴 공간 */}
            <section className={'flex-col-center'}>
                {/* 버전 */}
                <div className={cn('flex w-full')}>
                    <div>Version</div>
                    <div className={cn('flex')}>
                        <ButtonRounded
                            onClick={() => changeVersion(27)}
                            text={'EX'}
                        />
                        <ButtonRounded
                            onClick={() => changeVersion(28)}
                            text={'NX'}
                        />
                    </div>
                </div>

                {/* 타입 */}
                <div className={cn('flex w-full')}>
                    <div>Mode</div>
                    <div className={cn('flex w-full')}>
                        <ButtonStandard
                            onClick={() => changeGameType('g')}
                            text={'Guitar'}
                        />
                        <ButtonStandard
                            onClick={() => changeGameType('b')}
                            text={'Bass'}
                        />
                        <ButtonStandard
                            onClick={() => changeGameType('d')}
                            text={'Drum'}
                        />
                    </div>
                </div>
            </section>

            {/* 데이터 영역 */}
            {skill.length === 0 && (
                <section className={cn('flex-col-center')}>
                    TODO: No Data Text
                </section>
            )}
            {skill.map((s) => {
                const pattern = music?.pattern.find(
                    (m) => m.patterncode === s.patterncode,
                );

                if (!pattern) return null;

                return (
                    <MusicRecordItem
                        key={s.patterncode}
                        skill={s}
                        level={pattern.level}
                        patterncode={s.patterncode}
                    />
                );
            })}
        </section>
    );
};

export default MusicRecord;
