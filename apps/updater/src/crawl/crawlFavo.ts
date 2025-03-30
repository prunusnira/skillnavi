import crawlFromUrlList from './crawlFromUrlList';
import getFavoUrl from './runner/getFavoUrl';
import { CralwerFavoUrl, CrawlerFavoParams } from '../feature/crawler/component/CrawlerImport.type';
import UrlData from './data/urlData';

const crawlFavo = async (
    {
        page,
        gtype,
        delay,
        setCurrent,
        setBtnDisabled,
    }: CrawlerFavoParams,
) => {
    // url 리스트를 가져온 후 url 목록에 대한 곡 파싱 수행
    const urls: UrlData[] = [];
    if (gtype === 'all' || gtype === 'gf') {
        urls.push(...await getFavoUrl({ page, gtype: 'gf', setCurrent }));
    }
    if (gtype === 'all' || gtype === 'dm') {
        urls.push(...await getFavoUrl({ page, gtype: 'dm', setCurrent }));
    }

    crawlFromUrlList({ urls, delay, version: 0, setCurrent, setBtnDisabled });
};

export default crawlFavo;