'use client';

import { cn } from '@/module/util/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useSkillMenu from '@/component/skill/menu/useSkillMenu';
import ButtonRounded from '@/component/common/button/ButtonRounded';
import Select from '@/component/common/select/Select';
import { useTranslations } from 'next-intl';

const SkillMenu = () => {
    const {
        active,
        toggleMenu,
        versionSelectOption,
        onChangeVersion,
        onChangeTable,
        onChangeData,
        tableOptions,
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
                    'absolute left-0 top-8 w-full md:w-768px flex-col-center bg-black bg-opacity-70',
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
                        value={tableOptions.versionId}
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
