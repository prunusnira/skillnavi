import { cn } from '@/lib/cn';
import { Select, SelectOption } from '@skillnavi/ui';
import { usePatternGameVersion } from '@/feature/music/component/list/menu/usePatternGameVersion';
import { useTranslations } from 'next-intl';

interface Props {
    versionSelectOption?: SelectOption[];
}

export const PatternMenuGameVersion = ({ versionSelectOption }: Props) => {
    const { currentGameVersion, onChangeGameVersion } = usePatternGameVersion();
    const t = useTranslations('music.menu');

    return (
        <>
            <div className={cn('mt-5')}>{t('gameVersion')}</div>
            <div>
                {versionSelectOption && (
                    <Select
                        onChange={onChangeGameVersion}
                        options={versionSelectOption}
                        value={currentGameVersion}
                    />
                )}
            </div>
        </>
    );
};
