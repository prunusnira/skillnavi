import axios from "axios";
import * as cheerio from 'cheerio';
import UrlData from "../data/urlData";
import language from "../../function/language";
import text from '../../text/text';

interface Params {
    page: number,
    gtype: string,
    setCurrent: (s: string) => void,
}

const getFavoUrl = async (
    {
        page,
        gtype,
        setCurrent,
    }: Params
) => {
    let pageUrl: string;
    switch(page) {
        case 1:
            pageUrl = window.sinUrl.find(url => url.urltype === 'favo')?.url ?? '';
            break;
        case 2:
            pageUrl = window.sinUrl.find(url => url.urltype === 'favo2')?.url ?? '';
            break;
        case 3:
            pageUrl = window.sinUrl.find(url => url.urltype === 'favo3')?.url ?? '';
            break;
        default:
            pageUrl = '';
            break;
    }

    if(pageUrl === '') {
        alert((text.crawler.favorite.pageError as any)[language.setLang()]);
        return [];
    }

    const html = await axios.get(`${pageUrl}?gtype=${gtype}`);

    // get all link to each song -> run get song info
    const $ = cheerio.load(html.data)
    const linklist: UrlData[] = [];

    setCurrent("Favorite Folder URL Collecting...")
    $('.text_link').each((idx, val) => {
        linklist.push({
            targetTo: $(val).attr('href')!,
            ref: pageUrl,
        })
        console.log("[Collecting URL] "+ idx +" checked")
    })

    return linklist
}

export default getFavoUrl