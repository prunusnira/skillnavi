import text from '../../../text/text';
import React from 'react';
import { useAtomValue } from 'jotai';
import { atomCrawler } from '../../crawler/atom/Crawler.atom';
import useCrawerRunner from '../../crawler/component/useCrawerRunner';
import { UpdaterRow } from './Updater.data';
import UpdaterItemRow from './Updater.item.row';
import UpdaterBlock from './Updater.block';
import { ButtonStandard } from '@skillnavi/ui';

const Updater = () => {
    const env = useAtomValue(atomCrawler);
    const { crawlSelRunner, crawlRunner } = useCrawerRunner();
    const { lang, btnDisabled } = env;

    return (
        <section className="flex flex-col gap-[20px]">
            <div className="text-md font-bold">
                {(text.crawler.datat as any)[lang]}
            </div>

            {/* 스킬 대상곡 (quick) */}
            <UpdaterBlock
                title={(text.crawler.descTgtShortT as any)[lang]}
                description={(text.crawler.descTgtShort as any)[lang]}
            >
                <ButtonStandard
                    onClick={() => crawlRunner(11)}
                    disabled={btnDisabled}
                    text={'GF'}
                />
                <ButtonStandard
                    onClick={() => crawlRunner(12)}
                    disabled={btnDisabled}
                    text={'DM'}
                />
                <ButtonStandard
                    onClick={() => crawlRunner(10)}
                    disabled={btnDisabled}
                    text={'All'}
                />
            </UpdaterBlock>

            {/* 스킬대상곡 */}
            <UpdaterBlock
                title={(text.crawler.descTgtAllT as any)[lang]}
                description={(text.crawler.descTgtAll as any)[lang]}
            >
                <ButtonStandard
                    onClick={() => crawlRunner(31)}
                    disabled={btnDisabled}
                    text={'GF'}
                />
                <ButtonStandard
                    onClick={() => crawlRunner(32)}
                    disabled={btnDisabled}
                    text={'DM'}
                />
                <ButtonStandard
                    onClick={() => crawlRunner(30)}
                    disabled={btnDisabled}
                    text={'All'}
                />
            </UpdaterBlock>

            {/* 전곡 */}
            <UpdaterBlock
                title={(text.crawler.descAllT as any)[lang]}
                description={(text.crawler.descAll as any)[lang]}
            >
                <ButtonStandard
                    onClick={() => crawlRunner(21)}
                    disabled={btnDisabled}
                    text={'GF'}
                />
                <ButtonStandard
                    onClick={() => crawlRunner(22)}
                    disabled={btnDisabled}
                    text={'DM'}
                />
            </UpdaterBlock>

            {/* 플레이어 보드 */}
            <UpdaterBlock
                title={(text.crawler.board.title as any)[lang]}
                description={(text.crawler.board.desc as any)[lang]}
            >
                <ButtonStandard
                    onClick={() => crawlRunner(51)}
                    disabled={btnDisabled}
                    text={`GF ${(text.crawler.board.short as any)[lang]}`}
                />
                <ButtonStandard
                    onClick={() => crawlRunner(52)}
                    disabled={btnDisabled}
                    text={`DM ${(text.crawler.board.short as any)[lang]}`}
                />
            </UpdaterBlock>

            {/* 제목 행 */}
            <UpdaterBlock
                title={(text.crawler.selection as any)[lang]}
                description={(text.crawler.seldesc as any)[lang]}
            >
                <div className="flex flex-col justify-center items-center">
                    <div className="flex gap-[8px] flex-wrap">
                        {UpdaterRow.map((row) => (
                            <UpdaterItemRow row={row} />
                        ))}
                    </div>
                    <div className="flex">
                        <ButtonStandard
                            onClick={() => crawlSelRunner(1)}
                            disabled={btnDisabled}
                            text={(text.crawler.gsel as any)[lang]}
                        />
                        <ButtonStandard
                            onClick={() => crawlSelRunner(2)}
                            disabled={btnDisabled}
                            text={(text.crawler.dsel as any)[lang]}
                        />
                    </div>
                </div>
            </UpdaterBlock>
        </section>
    );
};

export default Updater;
