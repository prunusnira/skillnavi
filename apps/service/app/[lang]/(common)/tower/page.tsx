import Card from '@/common/card/Card';
import { getTowerList } from '@/feature/tower/api/getTowerList';
import { TowerList } from '@/feature/tower/data/Tower';
import { TowerListBlock } from '@/feature/tower/component/TowerListBlock';

const PageTowerMain = async () => {
    const towerList = await getTowerList();
    const gfList: TowerList[] = [];
    const dmList: TowerList[] = [];
    const spList: TowerList[] = [];

    towerList.forEach(item => {
        switch (item.game) {
            case 'gf':
                gfList.push(item);
                break;
            case 'dm':
                dmList.push(item);
                break;
            case 'sp':
                spList.push(item);
                break;
            default:
                break;
        }
    });

    return (
        <Card title={'Tower'}>
            <article className={'flex-col-center w-full gap-[16px]'}>
                <TowerListBlock type={'gf'} itemList={gfList} />
                <TowerListBlock type={'dm'} itemList={dmList} />
                <TowerListBlock type={'sp'} itemList={spList} />
            </article>
        </Card>
    );
};

export default PageTowerMain;
