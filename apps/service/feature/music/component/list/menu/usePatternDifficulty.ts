import { ChangeEvent } from 'react';
import { usePatternMenu } from '@/feature/music/component/list/menu/usePatternMenu';
import { useSearchParams } from 'next/navigation';

export const usePatternDifficulty = () => {
    const { updateSearchParams } = usePatternMenu();
    const searchParams = useSearchParams();

    const onChangeDifficulty = (e: ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams('difficulty', e.currentTarget.value);
    };

    return {
        currentDifficulty: Number(searchParams.get('difficulty')),
        onChangeDifficulty,
    };
};
