import getMusicUrl from './runner/getMusicUrl';
import UrlData from './data/urlData';
import { CrawlerAllParams } from '../feature/crawler/component/CrawlerImport.type';

const crawlAllSong = (
    {
        gtype,
        delay,
        isSelective,
        category,
        version,
        setCurrent,
        setBtnDisabled,
    }: CrawlerAllParams,
) => {
    const allCategories = 37; // 고정값
    const sid = 2; // 고정값
    const page = 1; // 고정값
    const urlArray: UrlData[] = []; // 업로드 노래 수에 따라 변동

    if (!isSelective) {
        const catArr: number[] = [];
        Array.from(new Array(allCategories).keys()).forEach(i => {
            catArr.push(i);
        });
        setCurrent('Collecting URLs for each category...');
        console.log('[All songs] Collecting URL data');
        getMusicUrl({
            gtype, allCategories, delay, category: catArr, currentIndex: 0, urlArray, sid, page,
            version, setCurrent, setBtnDisabled,
        });
        // gtype, 카테고리 개수, delay, 카테고리 배열, 현재 카테고리, url, sid, page
    } else {
        setCurrent('Collecting URLs for selected category...');
        console.log('[Partial update] Collecting URL data');
        getMusicUrl({
            gtype, allCategories: category.length, delay, category, currentIndex: 0, urlArray, sid, page,
            version, setCurrent, setBtnDisabled,
        });
        // gtype, 카테고리 개수, delay, 카테고리 배열, 현재 카테고리, url, sid, page
    }
};

export default crawlAllSong;