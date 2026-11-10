'use client';

import { PropsWithChildren, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';
import { TowerUpdateFloorIcon } from '@/feature/tower/component/TowerUpdateFloorIcon';
import { useTranslations } from 'next-intl';

interface Props extends PropsWithChildren {
    floor: number;
    isCleared: boolean;
    icon?: string;
}

export const TowerDetailBlock = ({ floor, isCleared, icon, children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('tower');
    const panelId = `tower-floor-${floor}-items`;
    const statusClass = isCleared
        ? 'border-lime-300 bg-lime-100 text-lime-800 dark:border-lime-300/30 dark:bg-lime-300/10 dark:text-lime-200'
        : 'border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300';

    return (
        <section className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <div className="flex w-full flex-wrap items-center border-b border-slate-200/80 bg-slate-50/80 p-3 dark:border-slate-700 dark:bg-[#131a2a] sm:p-4">
                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        className="group inline-flex items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:hover:bg-slate-800"
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-lg font-extrabold tabular-nums text-lime-300 shadow-inner dark:bg-black">
                            {String(floor + 1).padStart(2, '0')}
                        </span>
                        <span className="min-w-0">
                            <span className="block text-[10px] font-bold tracking-[0.16em] text-slate-500 uppercase dark:text-slate-400">
                                Floor
                            </span>
                            <span className="block truncate text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                                Floor {floor + 1}
                            </span>
                        </span>
                    </button>
                    {isCleared && icon && (
                        <TowerUpdateFloorIcon icon={icon} />
                    )}
                </div>
                <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={`Floor ${floor + 1}: ${isOpen ? 'collapse' : 'expand'}`}
                    className="group flex min-h-16 min-w-0 flex-1 items-center justify-end gap-2 rounded-xl px-2 text-left transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 dark:hover:bg-slate-800"
                    onClick={() => setIsOpen((open) => !open)}
                >
                    <span
                        className={`inline-flex shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold ${statusClass}`}
                    >
                        {isCleared ? t('status.clear') : t('status.yet')}
                    </span>
                    <FontAwesomeIcon
                        icon={isOpen ? faChevronUp : faChevronDown}
                        className="ml-1 text-sm text-slate-500 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100"
                    />
                </button>
            </div>
            <div
                id={panelId}
                className={clsx('flex w-full flex-col gap-3 p-3 sm:gap-4 sm:p-5', {
                    hidden: !isOpen,
                })}
            >
                {children}
            </div>
        </section>
    );
};
