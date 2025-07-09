import { cn } from '@/lib/cn';
import { usePatternMusicVersion } from '@/feature/music/component/list/menu/usePatternMusicVersion';
import { useTranslations } from 'next-intl';
import { VersionSelector } from '@/common/versionSelector/VersionSelector';

export const PatternMenuMusicVersion = () => {
    const { currentMusicVersion, onChangeMusicVersion } =
        usePatternMusicVersion();
    const t = useTranslations('music.menu');

    return (
        <>
            <div className={cn('mt-5')}>{t('musicVersion')}</div>
            <div>
                <VersionSelector
                    onChangeVersion={onChangeMusicVersion}
                    currentVersion={currentMusicVersion}
                />
            </div>
        </>
    );
};
