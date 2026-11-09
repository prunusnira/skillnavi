'use client';

import { GameType } from '@/common/game/data/GameType';
import { usePathname, useRouter } from '@/i18n/routing';
import { ButtonRounded } from '@skillnavi/ui';
import { useTranslations } from 'next-intl';

interface Props {
    type: GameType;
}

const SkillRankType = ({ type }: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('common');

    const changeType = (type: GameType) => {
        const newParams = new URLSearchParams();
        newParams.set('type', type);
        newParams.set('page', '1');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <section className="surface-muted flex w-full flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {t('type')}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {t('skillRankHint')}
                </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:min-w-60">
                <ButtonRounded
                    text="GF"
                    onClick={() => changeType('gf')}
                    isSelected={type === 'gf'}
                />
                <ButtonRounded
                    text="DM"
                    onClick={() => changeType('dm')}
                    isSelected={type === 'dm'}
                />
            </div>
        </section>
    );
};

export default SkillRankType;
