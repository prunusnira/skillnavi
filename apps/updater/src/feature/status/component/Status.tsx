import text from '../../../text/text';
import React from 'react';
import { useAtom } from 'jotai';
import { atomCrawler } from '../../crawler/atom/Crawler.atom';

const Status = () => {
    const [env, setEnv] = useAtom(atomCrawler);
    const { lang, delay, current } = env;

    return (
        <section>
            {/* 현재 갱신 상황 */}
            <div className="flex flex-col gap-[4px] mb-[20px]">
                <div className="text-md font-bold">{(text.crawler.current as any)[lang]}</div>
                <div className="text-sm">{current || 'NOT WORKING'}</div>
            </div>

            {/* 딜레이 조정 */}
            <div className="flex flex-col gap-[4px]">
                <div className="text-md font-bold">{(text.crawler.pause as any)[lang]}</div>
                <div className="flex">
                    <input
                        className="flex-grow"
                        type="range"
                        id="delaySlider"
                        value={delay}
                        min="10"
                        max="2000"
                        onChange={(event) => {
                            setEnv({ delay: Number(event.currentTarget.value || 0) });
                        }}
                    />
                    <span className="text-sm font-medium min-w-[100px]">
                    {delay} ms
                </span>
                </div>
            </div>
        </section>
    );
};

export default Status;