'use client';

import { GameTypeAll } from '@/common/game/data/GameType';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { ButtonRounded } from '@skillnavi/ui';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { ChangeEvent } from 'react';
import { useAtomValue } from 'jotai';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';

const PlayCountRankType = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const latest = useAtomValue(atomGameVersionLatest);

    const changeType = (type: GameTypeAll) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('type', type);
        newParams.set('page', '1');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    const changeVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        const newParams = new URLSearchParams(searchParams);
        const version = e.currentTarget.value;
        newParams.set('version', version);
        newParams.set('page', '1');
        router.push(`${pathname}?${newParams.toString()}`);
    };

    return (
        <>
            {/* game version */}
            <section className={'flex pb-[20px]'}>
                <VersionSelector
                    onChangeVersion={changeVersion}
                    currentVersion={Number(
                        searchParams.get('version') ?? latest?.id ?? 0,
                    )}
                    withoutAll
                    versionFrom={30}
                />
            </section>

            {/* game type */}
            <section className={'flex gap-[10px] pb-[20px]'}>
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
        </>
    );
};

export default PlayCountRankType;
