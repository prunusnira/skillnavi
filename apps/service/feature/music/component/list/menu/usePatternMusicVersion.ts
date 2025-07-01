import { ChangeEvent } from 'react';
import { usePatternMenu } from '@/feature/music/component/list/menu/usePatternMenu';
import { useSearchParams } from 'next/navigation';

export const usePatternMusicVersion = () => {
    const { updateSearchParams } = usePatternMenu();
    const searchParams = useSearchParams();

    const onChangeMusicVersion = (e: ChangeEvent<HTMLSelectElement>) => {
        updateSearchParams('musicVersion', e.currentTarget.value);
    };

    return {
        currentMusicVersion: Number(searchParams.get('musicVersion')),
        onChangeMusicVersion,
    };
};
