import { CheckboxItemType } from '@skillnavi/ui/src/checkbox/data/Checkbox.type';
import { RankSelector, RankType } from '@/feature/music/data/RankSelector';
import { atomMusicRank } from '@/feature/music/atom/atomMusic';
import { useAtom } from 'jotai';

export const usePatternRank = () => {
    const [
        selectedRank,
        setSelectedRank,
    ] = useAtom(atomMusicRank);

    const rankSelect: CheckboxItemType<RankType>[] = RankSelector.map(
        (rank) => ({
            display: rank,
            value: rank,
            checked: selectedRank.includes(rank),
        }),
    );

    const onChangeRank = (value: RankType, checked: boolean) => {
        if (checked) {
            setSelectedRank([
                ...selectedRank,
                value,
            ]);
        } else {
            setSelectedRank(selectedRank.filter((rank) => rank !== value));
        }
    };

    return {
        checkboxOptions: rankSelect,
        onChangeRank,
    };
};
