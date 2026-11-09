import AlbumArt from '@/common/albumart/AlbumArt';
import PatternTag from '@/common/pattern/PatternTag';
import { PatternDifficultyCompareRow } from '@/feature/music/data/PatternDifficultyCompare';

interface Props {
    rows: PatternDifficultyCompareRow[];
    labels: {
        albumArt: string;
        song: string;
        difficulty: string;
        version1Difficulty: string;
        version2Difficulty: string;
        difference: string;
        noResults: string;
    };
}

const formatLevel = (level: number | null) =>
    level === null ? '-' : (level / 100).toFixed(2);

const formatDifference = (difference: number | null) => {
    if (difference === null) {
        return '';
    }

    const formatted = (difference / 100).toFixed(2);
    return difference > 0 ? `+${formatted}` : formatted;
};

export const PatternDifficultyCompareTable = ({ rows, labels }: Props) => {
    if (rows.length === 0) {
        return (
            <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                {labels.noResults}
            </p>
        );
    }

    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead>
                    <tr className="border-b border-slate-200 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
                        <th
                            scope="col"
                            aria-label={labels.albumArt}
                            className="px-3 py-3"
                        />
                        <th scope="col" className="px-3 py-3 font-semibold">
                            {labels.song}
                        </th>
                        <th scope="col" className="px-3 py-3 font-semibold">
                            {labels.difficulty}
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-right font-semibold"
                        >
                            {labels.version1Difficulty}
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-right font-semibold"
                        >
                            {labels.version2Difficulty}
                        </th>
                        <th
                            scope="col"
                            className="px-3 py-3 text-right font-semibold"
                        >
                            {labels.difference}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr
                            key={`${row.mid}-${row.patterncode}`}
                            className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                        >
                            <td className="w-16 px-3 py-2">
                                <AlbumArt
                                    mid={row.mid}
                                    size={48}
                                    className="rounded-md"
                                />
                            </td>
                            <td className="min-w-40 px-3 py-2 font-medium text-slate-900 dark:text-slate-100">
                                {row.name}
                            </td>
                            <td className="px-3 py-2">
                                <PatternTag patternCode={row.patterncode} />
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums">
                                {formatLevel(row.version1Level)}
                            </td>
                            <td className="px-3 py-2 text-right tabular-nums">
                                {formatLevel(row.version2Level)}
                            </td>
                            <td className="px-3 py-2 text-right font-semibold tabular-nums">
                                {formatDifference(row.difference)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
