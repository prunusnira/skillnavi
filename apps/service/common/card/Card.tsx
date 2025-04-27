'use client';

import { cn } from '@/lib/cn';
import { forwardRef, ReactNode } from 'react';

interface Props {
    title?: string;
    sub?: ReactNode;
    children: ReactNode;
}

const Card = forwardRef<HTMLDivElement, Props>(
    ({ title, sub, children }, ref) => {
        return (
            // 공통 카드 ui
            <section
                className={
                    'flex-col-center p-[6px] w-full flex-grow min-h-[300px]'
                }
                ref={ref}
            >
                {title && (
                    <div
                        className={
                            'w-full bg-purple-300 dark:bg-gray-600 text-black dark:text-white text-xl font-bold rounded-t-2xl px-[20px] py-[10px] flex justify-between'
                        }
                    >
                        <span>{title}</span>
                        <div>{sub}</div>
                    </div>
                )}
                <div
                    className={cn(
                        'flex flex-col justify-start items-center bg-purple-200 dark:bg-gray-700 w-full h-full flex-grow',
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
    },
);

export default Card;

Card.displayName = 'Card';
