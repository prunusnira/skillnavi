import { convertRateToRank } from '@/lib/game/convertRateToRank';

interface Props {
    rank: string;
    rate: number;
}

const RANKS = ['EXC', 'SS', 'S', 'A', 'B', 'C', 'D', 'E', 'F'] as const;
type Rank = (typeof RANKS)[number];
const DEFAULT_RANK_COLOR =
    'border-slate-300 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';
const RANK_COLORS: Partial<Record<Rank, string>> = {
    EXC: 'border-yellow-300 bg-yellow-100 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-100',
    SS: 'border-yellow-300 bg-yellow-100 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-100',
    S: 'border-yellow-300 bg-yellow-100 text-yellow-900 dark:border-yellow-700 dark:bg-yellow-900/60 dark:text-yellow-100',
    A: 'border-red-300 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950/60 dark:text-red-200',
};

const isRank = (value: string): value is Rank => RANKS.includes(value as Rank);

const RankTag = ({ rank, rate }: Props) => {
    const normalizedRank = rank.trim().toUpperCase();
    const rankLabel =
        normalizedRank === 'EXCELLENT'
            ? 'EXC'
            : isRank(normalizedRank)
              ? normalizedRank
              : normalizedRank
                ? null
                : convertRateToRank(rate);

    if (!rankLabel) {
        return null;
    }

    const rankColor = RANK_COLORS[rankLabel] ?? DEFAULT_RANK_COLOR;

    return (
        <span
            className={`inline-flex min-h-6 min-w-9 items-center justify-center rounded-md border px-1.5 py-1 text-[10px] leading-none font-bold whitespace-nowrap md:min-h-7 md:min-w-10 md:px-2 md:text-xs ${rankColor}`}
        >
            {rankLabel}
        </span>
    );
};

export default RankTag;
