'use client';

import useNavbar from '@/feature/header/navbar/useNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';

export const MainFloatingMenu = () => {
    const { controlMenu } = useNavbar();
    return (
        <div
            className={clsx(
                'fixed right-4 top-3 z-50 sm:right-6',
                'h-10 w-10 flex-center',
                'rounded-xl border bg-white shadow-sm transition-colors',
                'hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800',
            )}
            onClick={controlMenu}
        >
            <FontAwesomeIcon
                icon={faBars}
                className={'w-[15px] h-[15px]'}
            />
        </div>
    );
};
