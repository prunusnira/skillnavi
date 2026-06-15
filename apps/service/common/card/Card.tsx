'use client';

import { cn } from '@/lib/cn';
import { forwardRef, ReactNode } from 'react';
import { CardOptions } from '@/common/card/CardOptions';

interface Props {
    title?: string;
    sub?: ReactNode;
    children: ReactNode;
    option?: CardOptions;
}

const Card = forwardRef<HTMLDivElement, Props>(
    ({ title, sub, children, option }, ref) => {
        return (
            // 공통 카드 ui
            <section
                className={'w-full py-2'}
                ref={ref}
            >
                <div className="panel">
                    {title && (
                        <div className="panel-title">
                            <span>{title}</span>
                            <div>{sub}</div>
                        </div>
                    )}
                    <div
                        className={cn('panel-content', {
                            ['justify-start']:
                                option?.itemStartPosition === 'start',
                            ['justify-center']:
                                !option?.itemStartPosition ||
                                option.itemStartPosition === 'center',
                            ['justify-end']:
                                option?.itemStartPosition === 'end',
                        })}
                    >
                        {children}
                    </div>
                </div>
            </section>
        );
    },
);

export default Card;

Card.displayName = 'Card';
