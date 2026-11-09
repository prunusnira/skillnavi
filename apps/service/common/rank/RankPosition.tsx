interface Props {
    value: number;
}

const RankPosition = ({ value }: Props) => {
    const color =
        value === 1
            ? 'border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-950/70 dark:text-amber-200'
            : value === 2
              ? 'border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200'
              : value === 3
                ? 'border-orange-300 bg-orange-100 text-orange-900 dark:border-orange-800 dark:bg-orange-950/70 dark:text-orange-200'
                : 'border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400';

    return (
        <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl border text-sm font-extrabold tabular-nums ${color}`}
            aria-label={`#${value}`}
        >
            {value}
        </span>
    );
};

export default RankPosition;
