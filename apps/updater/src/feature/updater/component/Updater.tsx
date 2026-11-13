import text from '../../../text/text';
import React, { useCallback, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { atomCrawler } from '../../crawler/atom/Crawler.atom';
import useCrawerRunner from '../../crawler/component/useCrawerRunner';
import { MusicConflictHandler } from '../../crawler/component/CrawlerImport.type';
import { MusicDuplicateGroup } from '@skillnavi/data/src/skill/SkillData';
import { UpdaterRow } from './Updater.data';
import UpdaterItemRow from './Updater.item.row';
import UpdaterBlock from './Updater.block';
import { ForceClassedButtonStandard } from '../../../common/ForceClassedButtonStandard';
import MusicConflictDialog from './MusicConflictDialog';

const Updater = () => {
    const env = useAtomValue(atomCrawler);
    const [musicConflicts, setMusicConflicts] = useState<MusicDuplicateGroup[]>(
        [],
    );
    const selectionResolver = useRef<
        ((selected: Record<string, number> | null) => void) | null
    >(null);
    const onMusicConflicts: MusicConflictHandler = useCallback(
        (conflicts) =>
            new Promise((resolve) => {
                selectionResolver.current = resolve;
                setMusicConflicts(conflicts);
            }),
        [],
    );
    const finishConflictSelection = (
        selectedMusicIds: Record<string, number> | null,
    ) => {
        const resolve = selectionResolver.current;
        selectionResolver.current = null;
        setMusicConflicts([]);
        resolve?.(selectedMusicIds);
    };
    const { crawlSelRunner, crawlRunner } = useCrawerRunner(onMusicConflicts);
    const { lang, btnDisabled } = env;

    return (
        <section className="!flex !flex-col !gap-[20px]">
            <div className="!text-md !font-bold">
                {(text.crawler.datat as any)[lang]}
            </div>

            {/* 스킬 대상곡 (quick) */}
            <UpdaterBlock
                title={(text.crawler.descTgtShortT as any)[lang]}
                description={(text.crawler.descTgtShort as any)[lang]}
            >
                <ForceClassedButtonStandard
                    onClick={() => crawlRunner(11)}
                    disabled={btnDisabled}
                    text={'GF'}
                />
                <ForceClassedButtonStandard
                    onClick={() => crawlRunner(12)}
                    disabled={btnDisabled}
                    text={'DM'}
                />
                <ForceClassedButtonStandard
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
                <ForceClassedButtonStandard
                    onClick={() => crawlRunner(31)}
                    disabled={btnDisabled}
                    text={'GF'}
                />
                <ForceClassedButtonStandard
                    onClick={() => crawlRunner(32)}
                    disabled={btnDisabled}
                    text={'DM'}
                />
                <ForceClassedButtonStandard
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
                <ForceClassedButtonStandard
                    onClick={() => crawlRunner(21)}
                    disabled={btnDisabled}
                    text={'GF'}
                />
                <ForceClassedButtonStandard
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
                <ForceClassedButtonStandard
                    onClick={() => crawlRunner(51)}
                    disabled={btnDisabled}
                    text={`GF ${(text.crawler.board.short as any)[lang]}`}
                />
                <ForceClassedButtonStandard
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
                        <ForceClassedButtonStandard
                            onClick={() => crawlSelRunner(1)}
                            disabled={btnDisabled}
                            text={(text.crawler.gsel as any)[lang]}
                        />
                        <ForceClassedButtonStandard
                            onClick={() => crawlSelRunner(2)}
                            disabled={btnDisabled}
                            text={(text.crawler.dsel as any)[lang]}
                        />
                    </div>
                </div>
            </UpdaterBlock>

            <MusicConflictDialog
                conflicts={musicConflicts}
                lang={lang}
                onCancel={() => finishConflictSelection(null)}
                onConfirm={(selectedMusicIds) =>
                    finishConflictSelection(selectedMusicIds)
                }
            />
        </section>
    );
};

export default Updater;
