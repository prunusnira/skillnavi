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
            className={cn(
                'flex-col-center p-1.5 w-full flex-grow min-h-[300px]',
            )}
        >
            {title && (
                <div
                    className={cn(
                        ' w-full bg-gray-800 text-white text-lg font-extrabold rounded-t-2xl px-5 py-2.5',
                    )}
                >
                    {title}
                </div>
            )}
            <div
                className={cn(
                    'flex-col-center bg-gray-700 w-full h-full flex-grow',
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
