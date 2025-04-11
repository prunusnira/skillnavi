import { TowerList } from '@/feature/tower/data/Tower';
import { TowerListItem } from '@/feature/tower/component/TowerListItem';
import { getTowerType } from '@/feature/tower/data/getTowerType';

interface Props {
    type: string;
    itemList: TowerList[];
}

export const TowerListBlock = ({ type, itemList }: Props) => {
    return (
        <section className={'flex-col-center gap-[8px]'}>
            <div className={'text-md font-semibold'}>{getTowerType(type)}</div>
            <div>
                {itemList.map((item) => (
                    <TowerListItem item={item} />
                ))}
            </div>
        </section>
    );
};