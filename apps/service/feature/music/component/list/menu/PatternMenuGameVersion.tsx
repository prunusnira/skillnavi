import { cn } from '@/lib/cn';
import { usePatternGameVersion } from '@/feature/music/component/list/menu/usePatternGameVersion';
import { useTranslations } from 'next-intl';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';

export const PatternMenuGameVersion = () => {
    const { currentGameVersion, onChangeGameVersion } = usePatternGameVersion();
    const t = useTranslations('music.menu');

    return (
        <>
            <div className={cn('mt-5')}>{t('gameVersion')}</div>
            <div>
                <VersionSelector
                    onChangeVersion={onChangeGameVersion}
                    currentVersion={currentGameVersion}
                />
            </div>
        </>
    );
};
