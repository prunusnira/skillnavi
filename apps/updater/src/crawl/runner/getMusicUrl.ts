import axios from 'axios';
import * as cheerio from 'cheerio';
import crawlFromUrlList from '../crawlFromUrlList';
import UrlData from '../data/urlData';
import { CrawlerParams } from '../../feature/crawler/component/CrawlerImport.type';

interface Params extends Omit<CrawlerParams, 'isSelective'> {
    allCategories: number;
    currentIndex: number;
    urlArray: UrlData[];
    sid: number;
}

const getMusicUrl = async (
    {
        gtype,
        allCategories,
        delay,
        category,
        currentIndex,
        urlArray,
        sid,
        page,
        version,
        setCurrent,
        setBtnDisabled,
    }: Params,
) => {
    const url = window.sinUrl.find(url => url.version === version && url.urltype === 'music')?.url;

    // 각 카테고리에서 곡 URL을 모두 뽑아서 가져옴
    if (currentIndex < allCategories) {
        const html = await axios.get(`${url}?gtype=${gtype}&cat=${category[currentIndex]}`);

        const $ = cheerio.load(html.data);

        // url collect
        $('.text_link').each((idx, val) => {
            urlArray.push({
                targetTo: $(val).attr('href')!,
                ref: `${url}?gtype=${gtype}&cat=${category[currentIndex]}`,
            });
            console.log(`[Collecting URL] Category ${currentIndex} / Music Count ${idx}`);
        });

        setTimeout(async () => {
            await getMusicUrl({
                gtype, allCategories, delay, category, currentIndex: currentIndex + 1, urlArray, sid, page,
                version, setCurrent, setBtnDisabled,
            });
        }, delay);
    } else {
        console.log('Skill data collecting...');

        // 수집된 모든 URL 데이터를 이용하여 데이터 수집 시행
        crawlFromUrlList({ urls: urlArray, delay, version, setCurrent, setBtnDisabled });
    }
};

export default getMusicUrl;