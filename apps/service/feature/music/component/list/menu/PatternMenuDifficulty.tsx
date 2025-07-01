import { cn } from '@/lib/cn';
import { Select } from '@skillnavi/ui';
import { difficultySelector } from '@/feature/music/data/DifficultySelector';
import { usePatternDifficulty } from '@/feature/music/component/list/menu/usePatternDifficulty';
import { useTranslations } from 'next-intl';

export const PatternMenuDifficulty = () => {
    const { currentDifficulty, onChangeDifficulty } = usePatternDifficulty();
    const t = useTranslations('music.menu');

    return (
        <>
            <div className={cn('mt-5')}>{t('difficulty')}</div>
            <div>
                <Select
                    onChange={onChangeDifficulty}
                    options={difficultySelector}
                    value={currentDifficulty}
                />
            </div>
        </>
    );
};
