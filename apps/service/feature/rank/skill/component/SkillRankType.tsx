'use client';

import { GameType } from '@/common/game/data/GameType';
import { usePathname, useRouter } from '@/i18n/routing';
import { ButtonStandard } from '@skillnavi/ui';

interface Props {
    type: GameType;
}

const SkillRankType = ({ type }: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    const changeType = (type: GameType) => {
        const newParams = new URLSearchParams();
        newParams.set('type', type);
        newParams.set('page', '1');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <section className={'flex w-full'}>
            <ButtonStandard
                text={'GF'}
                onClick={() => changeType('gf')}
                isSelected={type === 'gf'}
                customButtonClass={'flex-1'}
            />
            <ButtonStandard
                text={'DM'}
                onClick={() => changeType('dm')}
                isSelected={type === 'dm'}
                customButtonClass={'flex-1'}
            />
        </section>
    );
};

export default SkillRankType;
