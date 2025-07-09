'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { ButtonStandard } from '@skillnavi/ui';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { useAtomValue } from 'jotai';
import { atomGameVersionLatest } from '@/common/game/data/atomGameVersion';

const PlayCountOption = () => {
    const t = useTranslations('user.playcount.button');
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const type = searchParams.get('type');
    const latestVersion = useAtomValue(atomGameVersionLatest);

    const changePage = (type: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('type', type);
        router.replace(`${pathname}?${newParams.toString()}`);
    };

    const changeVersion = (version: number) => {
        const nextParams = new URLSearchParams(searchParams);
        nextParams.set('version', version.toString());
        router.replace(`${pathname}?${nextParams.toString()}`);
    };

    return (
        <section>
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

            {/* type */}
            <section className={'flex flex-col justify-center items-center'}>
                <div className={'text-sm'}>Type</div>
                <div>
                    <ButtonStandard
                        text={t('music')}
                        isSelected={type === 'music' || !type}
                        onClick={() => changePage('music')}
                    />
                    <ButtonStandard
                        text={t('pt')}
                        isSelected={type === 'pattern'}
                        onClick={() => changePage('pattern')}
                    />
                    <ButtonStandard
                        text={t('gf')}
                        isSelected={type === 'gf'}
                        onClick={() => changePage('gf')}
                    />
                    <ButtonStandard
                        text={t('dm')}
                        isSelected={type === 'dm'}
                        onClick={() => changePage('dm')}
                    />
                </div>
            </section>
        </section>
    );
};

export default PlayCountOption;
