import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

export const SidebarBox = ({ children }: PropsWithChildren) => {
    return (
        <section
            className={clsx(
                'mt-2 flex flex-col gap-1 rounded-xl border bg-white/70 p-2',
                'dark:border-slate-800 dark:bg-slate-900/70',
            )}
        >
            {children}
        </section>
    );
};
