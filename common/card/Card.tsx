'use client';

import { cn } from '@/lib/cn';
import { ReactNode } from 'react';

interface Props {
    title?: string;
    children: ReactNode;
}

const Card = ({ title, children }: Props) => {
    return (
        // 공통 카드 ui
        <section
            className={'flex-col-center p-[6px] w-full flex-grow min-h-[300px]'}
        >
            {title && (
                <div
                    className={
                        'w-full bg-purple-300 text-black text-xl font-bold rounded-t-2xl px-[20px] py-[10px]'
                    }
                >
                    {title}
                </div>
            )}
            <div
                className={cn(
                    'flex-col-center bg-purple-200 w-full h-full flex-grow',
                    {
                        ['rounded-2xl']: !title,
                        ['rounded-b-2xl rounded-t-none']: !!title,
                    },
                )}
            >
                {children}
            </div>
        </section>
    );
};

export default Card;
