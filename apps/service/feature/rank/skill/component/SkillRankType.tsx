'use client';

import { GameType } from '@/common/game/data/GameType';
import { usePathname, useRouter } from '@/i18n/routing';
import { ButtonStandard } from '@skillnavi/ui';

const SkillRankType = () => {
    const pathname = usePathname();
    const router = useRouter();

    const changeType = (type: GameType) => {
        const newParams = new URLSearchParams();
        newParams.set('type', type);
        newParams.set('page', '1');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <section className={'flex'}>
            <ButtonStandard
                text={'GF'}
                onClick={() => changeType('gf')}
            />
            <ButtonStandard
                text={'DM'}
                onClick={() => changeType('dm')}
            />
        </section>
    );
};

export default SkillRankType;
