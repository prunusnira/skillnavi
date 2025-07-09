'use client';

import { useSearchParams } from 'next/navigation';
import { GameType } from '@/common/game/data/GameType';
import { usePathname, useRouter } from '@/i18n/routing';
import { ButtonRounded } from '@skillnavi/ui';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { useAtomValue } from 'jotai';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';

const ClearTableOption = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const latestVersion = useAtomValue(atomGameVersionLatest);

    const changeType = (type: GameType) => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('type', type);
        router.replace(`${pathname}?${nextParams.toString()}`);
    };

    const changeVersion = (version: number) => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('version', version.toString());
        router.replace(`${pathname}?${nextParams.toString()}`);
    };

    return (
        <section
            className={
                'flex flex-col gap-[12px] py-[20px] justify-center items-center'
            }
        >
            {/* game type */}
            <section className={'flex flex-col justify-center items-center'}>
                <div className={'text-sm'}>Game Type</div>
                <div className={'flex gap-[8px]'}>
                    <ButtonRounded
                        text={'GF'}
                        onClick={() => changeType('gf')}
                        isSelected={searchParams.get('type') === 'gf'}
                    />
                    <ButtonRounded
                        text={'DM'}
                        onClick={() => changeType('dm')}
                        isSelected={searchParams.get('type') === 'dm'}
                    />
                </div>
            </section>

            {/* game version */}
            <section className={'flex flex-col justify-center items-center'}>
                <div className={'text-sm'}>Game Version</div>
                <div>
                    <VersionSelector
                        onChangeVersion={(e) => {
                            changeVersion(Number(e.currentTarget.value));
                        }}
                        currentVersion={Number(
                            searchParams.get('version') ?? latestVersion?.id,
                        )}
                        withoutAll
                        versionFrom={24}
                    />
                </div>
            </section>
        </section>
    );
};

export default ClearTableOption;
