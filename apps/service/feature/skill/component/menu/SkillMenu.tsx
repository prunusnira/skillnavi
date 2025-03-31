'use client';

import { cn } from '@/lib/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useSkillMenu from '@/feature/skill/component/menu/useSkillMenu';
import Select from '@/common/select/Select';
import { useTranslations } from 'next-intl';
import { ButtonRounded } from '@skillnavi/ui';

const SkillMenu = () => {
    const {
        active,
        toggleMenu,
        versionSelectOption,
        onChangeVersion,
        onChangeTable,
        onChangeData,
        onChangeGame,
        currentVersion,
    } = useSkillMenu();
    const t = useTranslations('skill.menu');

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
                    'absolute left-0 top-8 w-full md:w-768px flex-col-center bg-white bg-opacity-80',
                    'p-5 transition-left',
                    {
                        ['left-0']: active,
                        ['-left-full']: !active,
                    },
                )}
            >
                {/* 버전 설정 */}
                <div className={cn('mt-5')}>{t('version.title')}</div>
                <div>
                    <Select
                        onChange={onChangeVersion}
                        options={versionSelectOption}
                        value={currentVersion}
                    />
                </div>

                {/* 데이터 설정 */}
                <div className={cn('mt-5')}>{t('data.title')}</div>
                <div className={cn('flex-center')}>
                    <ButtonRounded
                        onClick={() => onChangeData('target')}
                        text={t('data.target')}
                    />
                    <ButtonRounded
                        onClick={() => onChangeData('all')}
                        text={t('data.all')}
                    />
                </div>

                {/* 테이블 설정 */}
                <div className={cn('mt-5')}>{t('table.title')}</div>
                <div className={cn('flex-center')}>
                    <ButtonRounded
                        onClick={() => onChangeTable('grid')}
                        text={t('table.grid')}
                    />
                    <ButtonRounded
                        onClick={() => onChangeTable('list')}
                        text={t('table.list')}
                    />
                </div>

                {/* 게임 설정 */}
                <div className={cn('mt-5')}>{t('game.title')}</div>
                <div className={cn('flex-center')}>
                    <ButtonRounded
                        onClick={() => onChangeGame('gf')}
                        text={t('game.gf')}
                    />
                    <ButtonRounded
                        onClick={() => onChangeGame('dm')}
                        text={t('game.dm')}
                    />
                </div>

                {/* 닫기버튼 */}
                <div className={cn('my-5')}>
                    <ButtonRounded
                        onClick={toggleMenu}
                        text={t('button.close')}
                    />
                </div>
            </section>
        </>
    );
};

export default SkillMenu;
