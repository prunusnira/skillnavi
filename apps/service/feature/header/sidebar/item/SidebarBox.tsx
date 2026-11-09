import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

export const SidebarBox = ({ children }: PropsWithChildren) => {
    return (
        <section
            className={clsx(
                'mt-2 flex flex-col gap-1 rounded-2xl border border-white/10 bg-slate-950/55 p-2 shadow-inner shadow-black/20',
            )}
        >
            {children}
        </section>
    );
};
