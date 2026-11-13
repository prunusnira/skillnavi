import crawlProfile from './crawlProfile';
import getTargetSimple from './runner/getTargetSimple';
import { uploadSkillData } from './upload';
import { CrawlerTargetParams } from '../feature/crawler/component/CrawlerImport.type';
import { UpdateSkill } from '@skillnavi/data/src/skill/SkillData';

const crawlTargetQuick = async ({
                                    gtype,
                                    version,
                                    setCurrent,
                                    setBtnDisabled,
                                    onMusicConflicts,
                                }: Omit<CrawlerTargetParams, 'delay'>) => {
    const skillData: UpdateSkill = {
        uid: (window as any).sinUid,
        version,
        musicData: [],
    };

    console.log('[Simple update] Collecting data');
    setCurrent('Collecting Data... Initiating');

    if (gtype === 'all' || gtype === 'gf') {
        setCurrent('Collecting URL... GF Hot');
        const gfHot = await getTargetSimple({ gtype: 'gf', stype: 1, version });
        gfHot.forEach((d) => {
            skillData.musicData.push(d);
        });

        setCurrent('Collecting URL... GF Other');
        const gfOther = await getTargetSimple({
            gtype: 'gf',
            stype: 0,
            version,
        });
        gfOther.forEach((d) => {
            skillData.musicData.push(d);
        });
    }

    if (gtype === 'all' || gtype === 'dm') {
        setCurrent('Collecting URL... DM Hot');
        const dmHot = await getTargetSimple({ gtype: 'dm', stype: 1, version });
        dmHot.forEach((d) => {
            skillData.musicData.push(d);
        });

        setCurrent('Collecting URL... DM Other');
        const dmOther = await getTargetSimple({
            gtype: 'dm',
            stype: 0,
            version,
        });
        dmOther.forEach((d) => {
            skillData.musicData.push(d);
        });
    }

    const success = await uploadSkillData({
        skillData,
        type: 'simple',
        version,
        setCurrent,
        setBtnDisabled,
        onMusicConflicts,
    });

    if (success) {
        crawlProfile({ version, setCurrent, setBtnDisabled });
    }
};

export default crawlTargetQuick;
