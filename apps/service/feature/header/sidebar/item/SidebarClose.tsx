'use client';

import useNavbar from '@/feature/header/navbar/useNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';

export const SidebarClose = () => {
    const { controlMenu } = useNavbar();
    return (
        <div
            className={clsx(
                'fixed top-[20px] right-[20px] z-10',
                'w-[20px] h-[20px] flex-center p-[5px]',
                'cursor-pointer',
                'bg-white dark:bg-black rounded-[50%]',
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
