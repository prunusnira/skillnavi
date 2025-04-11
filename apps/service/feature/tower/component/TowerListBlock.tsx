import { TowerList } from '@/feature/tower/data/Tower';
import { TowerListItem } from '@/feature/tower/component/TowerListItem';

interface Props {
    type: string;
    itemList: TowerList[];
}

export const TowerListBlock = ({ type, itemList }: Props) => {
    const getTitle = (type: string) => {
        switch (type) {
            case 'gf': return 'GuitarFreaks';
            case 'dm': return 'DrumMania';
            case 'sp': return 'Special';
            default: return '';
        }
    }

    return (
        <section className={'flex-col-center gap-[8px]'}>
            <div className={'text-md font-semibold'}>{getTitle(type)}</div>
            <div>
                {itemList.map((item) => (
                    <TowerListItem item={item} />
                ))}
            </div>
        </section>
    );
};