import axios from 'axios';
import crawlMusic from './crawlMusic';
import { uploadSkillData } from './upload';
import {
    CrawlerUrlList,
    CrawlerUrlRunner,
} from '../feature/crawler/component/CrawlerImport.type';
import crawlProfile from './crawlProfile';
import { UpdateSkill } from '@skillnavi/data/src/skill/SkillData';

const crawlFromUrlList = ({
                              urls,
                              delay,
                              version,
                              setCurrent,
                              setBtnDisabled,
                              onMusicConflicts,
                          }: CrawlerUrlList) => {
    // 순서
    // 1. ref로 이동
    // 2. targetTo로 이동해서 데이터 수집
    const skillData: UpdateSkill = {
        uid: (window as any).sinUid,
        version,
        musicData: [],
    };
    runUrlIndex({
        skillData,
        urls,
        index: 0,
        delay,
        version,
        setCurrent,
        setBtnDisabled,
        onMusicConflicts,
    });
};

const runUrlIndex = async ({
                               skillData,
                               urls,
                               delay,
                               version,
                               index,
                               setBtnDisabled,
                               setCurrent,
                               onMusicConflicts,
                           }: CrawlerUrlRunner) => {
    if (index < urls.length) {
        const current = urls[index];

        if (!current) {
            return alert('ERROR: No previous page found');
        }

        // 이전페이지로 되돌아가기
        await axios.get(current.ref);

        // 새 곡 데이터 페이지로 이동
        const data = await crawlMusic(current.targetTo, setCurrent);

        skillData.musicData.push(data);
        setTimeout(async () => {
            await runUrlIndex({
                skillData,
                urls,
                index: index + 1,
                delay,
                version,
                setCurrent,
                setBtnDisabled,
                onMusicConflicts,
            });
        }, delay);
    } else {
        const success = await uploadSkillData({
            skillData,
            type: 'skill',
            version,
            setCurrent,
            setBtnDisabled,
            onMusicConflicts,
        });

        if (!success) {
            return;
        }

        await crawlProfile({
            version,
            setCurrent,
            setBtnDisabled,
        });
    }
};

export default crawlFromUrlList;
