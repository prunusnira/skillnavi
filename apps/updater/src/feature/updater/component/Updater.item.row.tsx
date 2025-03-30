import text from '../../../text/text';
import React from 'react';
import { useAtomValue } from 'jotai';
import { atomCrawler } from '../../crawler/atom/Crawler.atom';
import { Row } from './Updater.data';

interface Props {
    row: Row;
}

const UpdaterItemRow = ({ row }: Props) => {
    const env = useAtomValue(atomCrawler);
    const { lang } = env;

    return (
        <label>
            <input
                type="checkbox"
                name="ver[]"
                value={row.index}
            />
            {row.index === 0 && (text.crawler.numberAndOther as any)[lang]}
            {row.index > 0 && `${row.display}${(text.crawler.line as any)[lang]}`}
        </label>
    );
};

export default UpdaterItemRow;