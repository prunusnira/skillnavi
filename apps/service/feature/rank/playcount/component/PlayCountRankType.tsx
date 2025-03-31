'use client';

import { GameTypeAll } from '@/common/game/data/GameType';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { ButtonRounded } from '@skillnavi/ui';

const PlayCountRankType = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    const changeType = (type: GameTypeAll) => {
        const newParams = new URLSearchParams();
        newParams.set('type', type);
        newParams.set('page', '1');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <section className={'flex'}>
            <ButtonRounded
                text={'GF'}
                onClick={() => changeType('gf')}
                isSelected={type === 'gf'}
            />
            <ButtonRounded
                text={'DM'}
                onClick={() => changeType('dm')}
                isSelected={type === 'dm'}
            />
            <ButtonRounded
                text={'ALL'}
                onClick={() => changeType('all')}
                isSelected={type === 'all'}
            />
        </section>
    );
};

export default PlayCountRankType;
