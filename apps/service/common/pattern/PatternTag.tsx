import { cn } from '@/lib/cn';

interface Props {
    patternCode: number;
    showInstrument?: boolean;
}

const DIFFICULTIES = ['BSC', 'ADV', 'EXT', 'MAS'] as const;
const INSTRUMENTS = ['G', 'B', 'D'] as const;

const DIFFICULTY_COLORS = {
    BSC: 'border-sky-200 bg-sky-100 text-sky-800 dark:border-sky-800 dark:bg-sky-950/70 dark:text-sky-200',
    ADV: 'border-yellow-200 bg-yellow-100 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950/70 dark:text-yellow-200',
    EXT: 'border-red-200 bg-red-100 text-red-800 dark:border-red-800 dark:bg-red-950/70 dark:text-red-200',
    MAS: 'border-purple-200 bg-purple-100 text-purple-800 dark:border-purple-800 dark:bg-purple-950/70 dark:text-purple-200',
} as const;
const TAG_CLASSES =
    'inline-flex min-h-6 items-center justify-center rounded-md border px-1.5 py-1 text-[10px] leading-none font-bold whitespace-nowrap md:min-h-7 md:px-2 md:text-xs';

const PatternTag = ({ patternCode, showInstrument = true }: Props) => {
    if (!Number.isInteger(patternCode) || patternCode < 1 || patternCode > 12) {
        return null;
    }

    const patternIndex = patternCode - 1;
    const difficulty = DIFFICULTIES[patternIndex % DIFFICULTIES.length];
    const instrument =
        INSTRUMENTS[Math.floor(patternIndex / DIFFICULTIES.length)];

    if (!difficulty || !instrument) {
        return null;
    }

    return (
        <span
            className={cn(
                TAG_CLASSES,
                'shrink-0',
                showInstrument && 'gap-1',
                DIFFICULTY_COLORS[difficulty],
            )}
        >
            {showInstrument ? `${difficulty} ${instrument}` : difficulty}
        </span>
    );
};

export default PatternTag;
