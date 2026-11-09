'use client';

import useNavbar from '@/feature/header/navbar/useNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';

export const MainFloatingMenu = () => {
    const { controlMenu, isMenuOpen } = useNavbar();
    return (
        <button
            type="button"
            aria-label={
                isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            aria-controls="primary-navigation"
            className={clsx(
                'fixed right-4 top-3 z-[60] sm:right-6',
                'h-10 w-10 flex-center',
                'rounded-[14px] border border-lime-300/40 bg-slate-900 text-lime-200 shadow-md shadow-black/30 transition-all hover:-translate-y-0.5 hover:border-lime-200 hover:bg-lime-300 hover:text-slate-950',
            )}
            onClick={controlMenu}
        >
            <FontAwesomeIcon
                icon={isMenuOpen ? faXmark : faBars}
                className={'w-[15px] h-[15px]'}
            />
        </button>
    );
};
