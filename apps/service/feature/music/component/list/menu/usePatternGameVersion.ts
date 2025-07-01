import { usePatternMenu } from '@/feature/music/component/list/menu/usePatternMenu';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

export const usePatternGameVersion = () => {
    const { updateSearchParams } = usePatternMenu();
    const searchParams = useSearchParams();

    const onChangeGameVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams('gameVersion', e.currentTarget.value);
    };

    return {
        currentGameVersion: Number(searchParams.get('gameVersion')),
        onChangeGameVersion,
    };
};
