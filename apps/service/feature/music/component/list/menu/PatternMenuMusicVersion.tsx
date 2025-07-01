import { cn } from '@/lib/cn';
import { Select, SelectOption } from '@skillnavi/ui';
import { usePatternMusicVersion } from '@/feature/music/component/list/menu/usePatternMusicVersion';
import { useTranslations } from 'next-intl';

interface Props {
    versionSelectOption?: SelectOption[];
}

export const PatternMenuMusicVersion = ({ versionSelectOption }: Props) => {
    const { currentMusicVersion, onChangeMusicVersion } =
        usePatternMusicVersion();
    const t = useTranslations('music.menu');

    return (
        <>
            <div className={cn('mt-5')}>{t('musicVersion')}</div>
            <div>
                {versionSelectOption && (
                    <Select
                        onChange={onChangeMusicVersion}
                        options={versionSelectOption}
                        value={currentMusicVersion}
                    />
                )}
            </div>
        </>
    );
};
