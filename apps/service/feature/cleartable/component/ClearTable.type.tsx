'use client';

import { useSearchParams } from 'next/navigation';
import { GameType } from '@/common/game/data/GameType';
import ButtonRounded from '@/common/button/ButtonRounded';
import { usePathname, useRouter } from '@/i18n/routing';

const ClearTableType = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePath = (type: GameType) => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('type', type);
        router.replace(`${pathname}?${nextParams.toString()}`);
    };

    return (
        <section className={'flex gap-[8px]'}>
            <ButtonRounded
                text={'GF'}
                onClick={() => changePath('gf')}
            />
            <ButtonRounded
                text={'DM'}
                onClick={() => changePath('dm')}
            />
        </section>
    );
};

export default ClearTableType;
