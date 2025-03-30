import crawlProfile from './crawlProfile';
import CrawlData from './data/crawlData';
import getTargetSimple from './runner/getTargetSimple';
import upload from './upload';
import { CrawlerTargetParams } from '../feature/crawler/component/CrawlerImport.type';

const crawlTargetQuick = async (
    {
        gtype,
        delay,
        version,
        setCurrent,
        setBtnDisabled,
    }: CrawlerTargetParams,
) => {
    const skillData: CrawlData = {
        uid: (window as any).sinUid,
        version,
        musicData: [],
    };

    console.log('[Simple update] Collecting data');
    setCurrent('Collecting Data... Initiating');

    if (gtype === 'all' || gtype === 'gf') {
        setCurrent('Collecting URL... GF Hot');
        const gfHot = await getTargetSimple({ gtype: 'gf', stype: 1, version });
        gfHot.forEach(d => {
            skillData.musicData.push(d);
        });


        setCurrent('Collecting URL... GF Other');
        const gfOther = await getTargetSimple({ gtype: 'gf', stype: 0, version });
        gfOther.forEach(d => {
            skillData.musicData.push(d);
        });
    }

    if (gtype === 'all' || gtype === 'dm') {
        setCurrent('Collecting URL... DM Hot');
        const dmHot = await getTargetSimple({ gtype: 'dm', stype: 1, version });
        dmHot.forEach(d => {
            skillData.musicData.push(d);
        });

        setCurrent('Collecting URL... DM Other');
        const dmOther = await getTargetSimple({ gtype: 'dm', stype: 0, version });
        dmOther.forEach(d => {
            skillData.musicData.push(d);
        });
    }

    upload({ json: JSON.stringify(skillData), type: 'simple', version, setCurrent, setBtnDisabled });
    crawlProfile({ version, setCurrent, setBtnDisabled });
};

export default crawlTargetQuick;