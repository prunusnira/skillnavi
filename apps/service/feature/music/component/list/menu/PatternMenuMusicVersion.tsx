import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { usePatternMenu } from '@/feature/music/component/list/menu/usePatternMenu';
import { ChangeEvent } from 'react';

interface Props {
    musicVersion: number;
}

export const PatternMenuMusicVersion = ({ musicVersion }: Props) => {
    const { updateSearchParams } = usePatternMenu();

    const onChangeMusicVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams('musicVersion', e.currentTarget.value);
    };

    const t = useTranslations('music.menu');

    return (
        <>
            <div className={cn('mt-5')}>{t('musicVersion')}</div>
            <div>
                <VersionSelector
                    onChangeVersion={onChangeMusicVersion}
                    currentVersion={musicVersion}
                />
            </div>
        </>
    );
};
