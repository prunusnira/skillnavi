import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';
import { VER_TB } from '@/feature/env/data/constant';
import { usePatternMenu } from '@/feature/music/component/list/menu/usePatternMenu';
import { ChangeEvent } from 'react';

interface Props {
    musicVersion: number;
    gameVersion: number;
}

export const PatternMenuGameVersion = ({
    musicVersion,
    gameVersion,
}: Props) => {
    const { updateSearchParams } = usePatternMenu();

    const onChangeGameVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams('gameVersion', e.currentTarget.value);
    };

    const t = useTranslations('music.menu');

    return (
        <>
            <div className={cn('mt-5')}>{t('gameVersion')}</div>
            <div>
                <VersionSelector
                    onChangeVersion={onChangeGameVersion}
                    currentVersion={gameVersion}
                    versionFrom={VER_TB}
                    disabledUntil={musicVersion - 1}
                />
            </div>
        </>
    );
};
