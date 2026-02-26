'use client';

import { cn } from '@/lib/cn';
import useSkillMenu from '@/feature/skill/component/menu/useSkillMenu';
import { Select } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';
import { ButtonRounded } from '@skillnavi/ui';

const SkillMenu = () => {
    const {
        versionSelectOption,
        onChangeVersion,
        onChangeTable,
        onChangeData,
        onChangeGame,
        currentVersion,
    } = useSkillMenu();
    const t = useTranslations('skill.menu');

    return (
        <section
            className={cn(
                'w-full md:w-768px flex-col-center bg-opacity-80 grid grid-cols-1 md:grid-cols-2 gap-[10px] p-[10px]',
            )}
        >
            {/* 버전 설정 */}
            <div>
                <div className="w-full text-center">{t('version.title')}</div>
                <div className="flex-center">
                    {versionSelectOption && (
                        <Select
                            onChange={onChangeVersion}
                            options={versionSelectOption}
                            value={currentVersion}
                        />
                    )}
                </div>
            </div>

            {/* 데이터 설정 */}
            <div>
                <div className="w-full text-center">{t('data.title')}</div>
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
            </div>

            {/* 테이블 설정 */}
            <div>
                <div className="w-full text-center">{t('table.title')}</div>
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
            </div>

            {/* 게임 설정 */}
            <div>
                <div className="w-full text-center">{t('game.title')}</div>
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
            </div>
        </section>
    );
};

export default SkillMenu;
