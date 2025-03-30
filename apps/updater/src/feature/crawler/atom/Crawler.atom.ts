import { atom } from "jotai";
import { CrawlerAtom } from "../type/Crawler.atom.type";

export const atomCrawlerData = atom<CrawlerAtom>({
    delay: 500,
    current: '',
    btnDisabled: false,
    lang: 'en',
});

export const atomCrawler = atom(
    (get) => get(atomCrawlerData),
    (get, set, update: Partial<CrawlerAtom>) => {
        const prev = get(atomCrawlerData);
        if (!prev) return;
        set(atomCrawlerData, {...prev, ...update});
        console.log(update);
    }
)