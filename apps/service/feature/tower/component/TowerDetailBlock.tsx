'use client';

import { PropsWithChildren, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { clsx } from 'clsx';
import { TowerUpdateFloorIcon } from '@/feature/tower/component/TowerUpdateFloorIcon';

interface Props extends PropsWithChildren {
    floor: number;
    isCleared: boolean;
    icon?: string;
}

export const TowerDetailBlock = ({ floor, isCleared, icon, children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
                className={'text-4xl font-bold text-center py-[10px] flex-center gap-[10px] cursor-pointer'}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>
                    Floor {floor+1}
                </span>
                <span className={'text-xl'}>
                    {isCleared ? `(CLEARED)` : `(NOT CLEAR)`}
                </span>
                {isCleared && icon && (
                    <TowerUpdateFloorIcon icon={icon} />
                )}
                <span className={'text-xl'}>
                    {isOpen ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                    )}
                </span>
            </div>
            <div
                className={clsx('flex-col gap-[20px] w-full', {
                    ['hidden']: !isOpen,
                    ['flex']: isOpen,
                })}
            >
                {children}
            </div>
        </div>
    );
};