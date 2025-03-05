'use client';

import useMusicRecord from '@/feature/music/component/record/useMusicRecord';
import { cn } from '@/lib/cn';
import ButtonRounded from '@/common/button/ButtonRounded';
import MusicRecordItem from '@/feature/music/component/record/MusicRecordItem';

// CSR 기록 정보
const MusicRecord = () => {
    const {
        gameMode,
        music,
        skill,
        changeGameType,
        changeVersion,
        ptcodeList,
        availableVersion,
        version,
        mid,
    } = useMusicRecord();

    return (
        <section className={cn('w-full')}>
            {/* 메뉴 공간 */}
            <section className={'flex-col-center'}>
                {/* 버전 */}
                <div className={cn('flex items-center w-full py-2.5')}>
                    <div className={cn('w-[100px]')}>Version</div>
                    <div className={cn('flex')}>
                        {availableVersion?.map((ver) => (
                            <ButtonRounded
                                key={ver.id}
                                onClick={() => changeVersion(ver.id)}
                                text={ver.short}
                                isSelected={Number(version) === ver.id}
                            />
                        ))}
                    </div>
                </div>

                {/* 타입 */}
                <div className={cn('flex items-center w-full py-2.5')}>
                    <div className={cn('w-[100px]')}>Mode</div>
                    <div className={cn('flex w-full')}>
                        <ButtonRounded
                            onClick={() => changeGameType('g')}
                            text={'Guitar'}
                            isSelected={gameMode === 'g'}
                        />
                        <ButtonRounded
                            onClick={() => changeGameType('b')}
                            text={'Bass'}
                            isSelected={gameMode === 'b'}
                        />
                        <ButtonRounded
                            onClick={() => changeGameType('d')}
                            text={'Drum'}
                            isSelected={gameMode === 'd'}
                        />
                    </div>
                </div>
            </section>

            {/* 데이터 영역 */}
            {ptcodeList.map((ptcode) => {
                const result = skill.find((s) => s.patterncode === ptcode);

                const pattern = music?.pattern.find(
                    (m) => m.patterncode === ptcode,
                );

                if (!pattern || pattern.level === 0) return null;

                return (
                    <MusicRecordItem
                        key={ptcode}
                        skill={result}
                        level={pattern.level}
                        patterncode={ptcode}
                        mid={mid}
                        version={version}
                    />
                );
            })}
        </section>
    );
};

export default MusicRecord;
