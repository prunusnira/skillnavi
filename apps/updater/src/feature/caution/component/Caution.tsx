import text from '../../../text/text';
import React from 'react';
import { useAtomValue } from 'jotai';
import { atomCrawler } from '../../crawler/atom/Crawler.atom';

const Caution = () => {
    const env = useAtomValue(atomCrawler);
    const { lang, user } = env;
    return (
        <section>
            <div className="text-md font-bold">{(text.crawler.alert.title as any)[lang]}</div>
            <ul className="text-sm list-disc list-inside text-left -indent-[20px] ml-[20px]">
                <li className="list-item">{(text.crawler.alert.warn1 as any)[lang]}</li>
                <li className="list-item">{(text.crawler.alert.warn2 as any)[lang]}</li>
                <li className="list-item">{(text.crawler.alert.warn3 as any)[lang]}</li>
                <li className="list-item">{(text.crawler.alert.warn4 as any)[lang]}</li>
            </ul>
        </section>
    );
};

export default Caution;