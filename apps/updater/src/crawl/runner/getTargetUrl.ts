import axios from 'axios';
import * as cheerio from 'cheerio';
import UrlData from '../data/urlData';

interface Params {
    gtype: string,
    stype: number,
    version: number
}

const getTargetUrl = async (
    {
        gtype,
        stype,
        version,
    }: Params,
) => {
    const url = window.sinUrl.find(url => url.version === version && url.urltype === 'skill')?.url;

    if(!url) {
        return [] as UrlData[];
    }

    const html = await axios.get(`${url}?gtype=${gtype}&stype=${stype}`);

    // get all link to each song -> run get song info
    const $ = cheerio.load(html.data);
    const linklist: UrlData[] = [];

    $('.text_link').each((idx, val) => {
        linklist.push({
            targetTo: $(val).attr('href')!,
            ref: `${url}?gtype=${gtype}&stype=${stype}`,
        });
        console.log('[Collecting URL] ' + idx + ' checked');
    });

    return linklist;
};

export default getTargetUrl;