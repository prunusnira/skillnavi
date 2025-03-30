import text from '../../../text/text';
import React from 'react';
import { useAtomValue } from 'jotai';
import { atomCrawler } from '../../crawler/atom/Crawler.atom';

const InvalidUser = () => {
    const env = useAtomValue(atomCrawler);
    const { lang } = env;
    return (
        <section className={'flex flex-col'}>
            <div className="text-md font-bold mb-[10px]">User Not Logged in</div>
            <div className="text-sm">
                {(text.crawler.notlogin.line1 as any)[lang]}
            </div>
            <div className="text-sm">
                {(text.crawler.notlogin.line2 as any)[lang]}
            </div>
            <div className="text-sm">
                <a href="https://sin.nira.one" target="_blank" className="font-bold text-blue-400">
                    Skill Navigator
                </a>
                &nbsp;
                {(text.crawler.notlogin.line3 as any)[lang]}
            </div>
        </section>
    );
};

export default InvalidUser;