import { PropsWithChildren } from 'react';
import { clsx } from 'clsx';

export const SidebarBox = ({children}: PropsWithChildren) => {
    return (
        <section
            className={clsx(
                'flex flex-col',
                'rounded-2xl',
                'py-[10px] pl-[20px] mt-[5px]'
            )}
        >
            {children}
        </section>
    )
}