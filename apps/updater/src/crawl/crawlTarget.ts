import crawlFromUrlList from './crawlFromUrlList';
import UrlData from './data/urlData';
import getTargetUrl from './runner/getTargetUrl';
import { CrawlerTargetParams, CrawlerTargetUrl } from '../feature/crawler/component/CrawlerImport.type';

const crawlTarget = async (
    {
        gtype,
        delay,
        version,
        setCurrent,
        setBtnDisabled,
    }: CrawlerTargetParams,
) => {
    // url 리스트를 가져온 후 url 목록에 대한 곡 파싱 수행
    setCurrent('Collecting URL... Initiating');

    const urls: UrlData[] = [];

    if (gtype === 'all' || gtype === 'gf') {
        setCurrent('Collecting URL... GF Hot');
        const gfHotUrl = await getTargetUrl({ gtype: 'gf', stype: 1, version });

        setCurrent('Collecting URL... GF Other');
        const gfOtherUrl = await getTargetUrl({ gtype: 'gf', stype: 0, version });

        urls.push(...gfHotUrl, ...gfOtherUrl);
    }
    if (gtype === 'all' || gtype === 'dm') {
        setCurrent('Collecting URL... DM Hot');
        const dmHotUrl = await getTargetUrl({ gtype: 'dm', stype: 1, version });

        setCurrent('Collecting URL... DM Other');
        const dmOtherUrl = await getTargetUrl({ gtype: 'dm', stype: 0, version });

        urls.push(...dmHotUrl, ...dmOtherUrl);
    }

    setCurrent('Collecting Data... Initiating');
    crawlFromUrlList({ urls, delay, version, setCurrent, setBtnDisabled });
};

export default crawlTarget;