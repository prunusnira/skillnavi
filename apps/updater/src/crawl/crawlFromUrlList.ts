import axios from 'axios';
import crawlMusic from './crawlMusic';
import CrawlData from './data/crawlData';
import upload from './upload';
import {
    CrawlerUrlList,
    CrawlerUrlRunner,
} from '../feature/crawler/component/CrawlerImport.type';
import crawlProfile from './crawlProfile';

const crawlFromUrlList = ({
    urls,
    delay,
    version,
    setCurrent,
    setBtnDisabled,
}: CrawlerUrlList) => {
    // 순서
    // 1. ref로 이동
    // 2. targetTo로 이동해서 데이터 수집
    const skillData: CrawlData = {
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
            });
        }, delay);
    } else {
        // 완성된 데이터 업로드
        upload({
            json: JSON.stringify(skillData),
            type: 'skill',
            version,
            setCurrent,
            setBtnDisabled,
        }).finally(() => {
            crawlProfile({
                version,
                setCurrent,
                setBtnDisabled,
            });
        });
    }
};

export default crawlFromUrlList;
