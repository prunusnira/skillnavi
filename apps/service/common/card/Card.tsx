'use client';

import { cn } from '@/lib/cn';
import { forwardRef, ReactNode } from 'react';
import { CardOptions } from '@/common/card/CardOptions';

interface Props {
    title?: string;
    sub?: ReactNode;
    children: ReactNode;
    option?: CardOptions;
    variant?: 'default' | 'skill';
}

const Card = forwardRef<HTMLDivElement, Props>(
    ({ title, sub, children, option, variant = 'default' }, ref) => {
        const isSkillCard = variant === 'skill';

        return (
            // 공통 카드 ui
            <section className={'flex w-full py-2'} ref={ref}>
                <div
                    className={cn(
                        'panel flex w-full flex-col',
                        isSkillCard && 'panel-skill',
                    )}
                >
                    {title && (
                        <div
                            className={cn(
                                'panel-title',
                                isSkillCard && 'panel-title-skill',
                            )}
                        >
                            <span>{title}</span>
                            <div>{sub}</div>
                        </div>
                    )}
                    <div
                        className={cn(
                            'panel-content flex-1',
                            isSkillCard && 'panel-content-skill',
                            {
                                ['justify-start']:
                                    option?.itemStartPosition === 'start',
                                ['justify-center']:
                                    !option?.itemStartPosition ||
                                    option.itemStartPosition === 'center',
                                ['justify-end']:
                                    option?.itemStartPosition === 'end',
                            },
                        )}
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
