'use client';

import { cn } from '@/lib/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { usePatternMenu } from '@/feature/music/component/list/menu/usePatternMenu';
import { useTranslations } from 'next-intl';
import { ButtonRounded } from '@skillnavi/ui';
import { PatternMenuMusicVersion } from '@/feature/music/component/list/menu/PatternMenuMusicVersion';
import { PatternMenuGameVersion } from '@/feature/music/component/list/menu/PatternMenuGameVersion';
import { PatternMenuDifficulty } from '@/feature/music/component/list/menu/PatternMenuDifficulty';

export const PatternListMenu = () => {
    const { active, toggleMenu } = usePatternMenu();

    const t = useTranslations('music.menu');

    return (
        <>
            <section className={cn('w-full p-2.5')}>
                <FontAwesomeIcon
                    className={'z-10 cursor-pointer'}
                    onClick={toggleMenu}
                    icon={faBars}
                />
            </section>
            <section
                className={cn(
                    'absolute left-0 top-8 w-full md:w-768px flex-col-center bg-white dark:bg-black bg-opacity-80',
                    'p-5 transition-left',
                    {
                        ['left-0']: active,
                        ['-left-full']: !active,
                    },
                )}
            >
                {/* 곡 버전 설정 */}
                <PatternMenuMusicVersion />

                {/* 게임 버전 설정 */}
                <PatternMenuGameVersion />

                {/* 난이도 필터 */}
                <PatternMenuDifficulty />

                {/* 랭크 필터 */}
                {/*<PatternMenuRank />*/}

                {/* 닫기버튼 */}
                <div className={cn('my-5')}>
                    <ButtonRounded
                        onClick={toggleMenu}
                        text={t('close')}
                    />
                </div>
            </section>
        </>
    );
};
