import { cn } from '@/lib/cn';
import { Checkbox } from '@skillnavi/ui/src/checkbox/component/Checkbox';
import { usePatternRank } from '@/feature/music/component/list/menu/usePatternRank';
import { useTranslations } from 'next-intl';

export const PatternMenuRank = () => {
    const { checkboxOptions, onChangeRank } = usePatternRank();
    const t = useTranslations('music.menu');

    return (
        <>
            <div className={cn('mt-5')}>{t('rank')}</div>
            <div className={'flex gap-[8px]'}>
                <Checkbox
                    group={'rank'}
                    items={checkboxOptions}
                    action={onChangeRank}
                />
            </div>
        </>
    );
};
